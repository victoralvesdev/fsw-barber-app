"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import { format } from "date-fns"

interface CreateBookingParams {
  serviceId: string
  date: Date
  clientName: string
  clientPhone: string
}

export const createBooking = async (params: CreateBookingParams) => {
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("Usuário não autenticado")
  }

  // Buscar o service para obter o barbershopId
  const service = await db.barbershopService.findUnique({
    where: { id: params.serviceId },
    select: { barbershopId: true }
  })

  if (!service) {
    throw new Error("Serviço não encontrado")
  }

  // Criar booking no banco
  await db.booking.create({
    data: { 
      serviceId: params.serviceId,
      barbershopId: service.barbershopId,
      userId: (user.user as any).id,
      clientName: params.clientName,
      clientPhone: params.clientPhone,
      date: params.date
    }
  })

  // Enviar webhook
  try {
    // Formatar telefone: remover caracteres especiais e adicionar formato 5511999999999
    const phoneNumbers = params.clientPhone.replace(/\D/g, ''); // Remove tudo que não é dígito
    const formattedPhone = phoneNumbers.startsWith('55') ? phoneNumbers : `55${phoneNumbers}`;

    const webhookData = {
      nome: params.clientName,
      numero: formattedPhone,
      data: format(params.date, "dd/MM/yyyy"),
      horario: format(params.date, "HH:mm")
    }

    console.log("Enviando webhook:", webhookData)

    await fetch("https://servidor-n8n.7jjp89.easypanel.host/webhook/dorta/cortes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookData),
    })

    console.log("Webhook enviado com sucesso")
  } catch (error) {
    console.error("Erro ao enviar webhook:", error)
    // Não falhar o agendamento se o webhook falhar
  }

  revalidatePath("/barbershops/[id]")
  revalidatePath("/bookings")
}
