# 📋 Documentação - FSW Barber

## 📖 Sobre o Projeto

O **FSW Barber** é uma aplicação web moderna para agendamento de serviços em barbearias. O sistema permite que usuários visualizem barbearias, seus serviços, façam agendamentos e gerenciem suas reservas através de uma interface intuitiva e responsiva.

### 🎯 Funcionalidades Principais

- ✅ Listagem de barbearias com informações detalhadas
- ✅ Catálogo de serviços por barbearia
- ✅ Sistema de agendamento com seleção de data e horário
- ✅ Autenticação via Google OAuth
- ✅ Gerenciamento de agendamentos (criar, visualizar, cancelar)
- ✅ Busca por barbearias e serviços
- ✅ Interface responsiva e moderna
- ✅ Temas claro/escuro

## 🏗️ Arquitetura

### Stack Tecnológica

- **Framework:** Next.js 14.2.5 (App Router)
- **Linguagem:** TypeScript 5
- **Estilização:** Tailwind CSS 3.4.1
- **Componentes UI:** Shadcn/UI + Radix UI
- **Banco de Dados:** Supabase (PostgreSQL)
- **ORM:** Prisma 5.17.0
- **Autenticação:** NextAuth.js 4.24.7 (JWT Strategy)
- **BaaS:** Supabase
- **Validação:** Zod 3.23.8
- **Formulários:** React Hook Form 7.52.2
- **Datas:** date-fns 3.6.0

## 🗃️ Estrutura do Banco de Dados

### Tabelas Principais

#### 👤 User
- `id` (UUID): Identificador único gerado automaticamente
- `name` (String): Nome do usuário (obrigatório)
- `email` (String): Email único
- `createdAt`, `updatedAt`: Timestamps com timezone

#### 🏪 Barbershop
- `id` (UUID): UUID único gerado automaticamente
- `name` (String): Nome da barbearia
- `address` (String): Endereço
- `phone` (String?): Telefone (opcional)
- `description` (String?): Descrição (opcional)
- `imageUrl` (String?): URL da imagem (opcional)
- `createdAt`, `updatedAt`: Timestamps com timezone

#### ✂️ BarbershopService
- `id` (UUID): UUID único gerado automaticamente
- `barbershopId` (UUID): Referência à barbearia
- `name` (String): Nome do serviço
- `description` (String?): Descrição do serviço (opcional)
- `imageUrl` (String?): URL da imagem (opcional)
- `price` (Decimal): Preço com 2 casas decimais
- `createdAt`, `updatedAt`: Timestamps com timezone

#### 📅 Booking
- `id` (UUID): UUID único gerado automaticamente
- `serviceId` (UUID): Referência ao serviço
- `barbershopId` (UUID): Referência à barbearia
- `userId` (UUID): Referência ao usuário
- `date` (DateTime): Data e hora do agendamento com timezone
- `createdAt`, `updatedAt`: Timestamps com timezone

> **Nota:** As tabelas de autenticação do NextAuth (Account, Session, VerificationToken) foram removidas pois o projeto agora usa JWT Strategy ao invés do Database Strategy.

## 📦 Dependências

### Dependências de Produção

```json
{
  "@auth/prisma-adapter": "^2.4.2",        // Adaptador NextAuth + Prisma
  "@hookform/resolvers": "^3.9.0",         // Resolvers para React Hook Form
  "@prisma/client": "^5.17.0",             // Cliente Prisma
  "@radix-ui/react-avatar": "^1.1.0",      // Componente Avatar
  "@radix-ui/react-dialog": "^1.1.1",      // Componente Modal/Dialog
  "@radix-ui/react-label": "^2.1.0",       // Componente Label
  "@radix-ui/react-slot": "^1.1.0",        // Componente Slot
  "class-variance-authority": "^0.7.0",     // Utilitário para variantes CSS
  "clsx": "^2.1.1",                        // Utilitário para classes CSS
  "date-fns": "^3.6.0",                    // Biblioteca de manipulação de datas
  "lucide-react": "^0.412.0",              // Ícones
  "next": "14.2.5",                        // Framework Next.js
  "next-auth": "^4.24.7",                  // Autenticação
  "next-themes": "^0.3.0",                 // Gerenciamento de temas
  "react": "^18",                          // React
  "react-day-picker": "^8.10.1",           // Seletor de datas
  "react-dom": "^18",                      // React DOM
  "react-hook-form": "^7.52.2",            // Gerenciamento de formulários
  "sonner": "^1.5.0",                      // Notificações toast
  "tailwind-merge": "^2.4.0",              // Merge de classes Tailwind
  "tailwindcss-animate": "^1.0.7",         // Animações Tailwind
  "zod": "^3.23.8"                         // Validação de schemas
}
```

### Dependências de Desenvolvimento

```json
{
  "@types/node": "^20",                     // Tipos TypeScript para Node.js
  "@types/react": "^18",                    // Tipos TypeScript para React
  "@types/react-dom": "^18",                // Tipos TypeScript para React DOM
  "eslint": "^8",                           // Linter
  "eslint-config-next": "14.2.5",          // Configuração ESLint para Next.js
  "git-commit-msg-linter": "^5.0.8",       // Linter para mensagens de commit
  "husky": "^9.1.1",                       // Git hooks
  "lint-staged": "^15.2.7",                // Linter para arquivos staged
  "postcss": "^8",                          // Processador CSS
  "prettier": "^3.3.3",                    // Formatador de código
  "prettier-plugin-tailwindcss": "^0.6.5", // Plugin Prettier para Tailwind
  "prisma": "^5.17.0",                     // CLI do Prisma
  "tailwindcss": "^3.4.1",                 // Framework CSS
  "ts-node": "^10.9.2",                    // Executador TypeScript
  "typescript": "^5"                        // Compilador TypeScript
}
```

## 🚀 Configuração do Ambiente

### Variáveis de Ambiente Necessárias

```env
# Supabase Database Configuration
DATABASE_URL="postgresql://postgres.veuzptwfwcryivbgozsn:[YOUR_PASSWORD]@db.veuzptwfwcryivbgozsn.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.veuzptwfwcryivbgozsn:[YOUR_PASSWORD]@db.veuzptwfwcryivbgozsn.supabase.co:5432/postgres"

# Supabase Project Configuration
NEXT_PUBLIC_SUPABASE_URL="https://veuzptwfwcryivbgozsn.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZldXpwdHdmd2NyeWl2YmdvenNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNTMzNjksImV4cCI6MjA2NjcyOTM2OX0.7DO0S_TmkIGiS4p_TK4MugeT_nWnHROm6ymX9o0YfS0"

# NextAuth Configuration (JWT Strategy)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Google OAuth Configuration
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

> **⚠️ Importante:** Substitua `[YOUR_PASSWORD]` pela senha do seu banco Supabase. As outras configurações já estão corretas para o projeto fsw-barber-app.

### 🚀 Supabase Configuration

O projeto agora usa **Supabase** como backend principal:

- **Project ID:** `veuzptwfwcryivbgozsn`
- **URL:** `https://veuzptwfwcryivbgozsn.supabase.co`
- **Region:** `us-east-1`
- **Database:** PostgreSQL 17.4.1

## 📁 Estrutura de Diretórios

```
fsw-barber/
├── app/                          # App Router (Next.js 13+)
│   ├── _actions/                 # Server Actions
│   │   ├── create-booking.ts     # Ação para criar agendamento
│   │   ├── delete-booking.ts     # Ação para excluir agendamento
│   │   └── get-bookings.ts       # Ação para buscar agendamentos
│   ├── _components/              # Componentes reutilizáveis
│   │   ├── ui/                   # Componentes base (Shadcn/UI)
│   │   ├── barbershop-item.tsx   # Card de barbearia
│   │   ├── booking-item.tsx      # Card de agendamento
│   │   ├── header.tsx            # Cabeçalho
│   │   ├── search.tsx            # Componente de busca
│   │   └── service-item.tsx      # Card de serviço
│   ├── _constants/               # Constantes da aplicação
│   │   └── search.ts             # Opções de busca rápida
│   ├── _data/                    # Funções de busca de dados
│   ├── _lib/                     # Utilitários e configurações
│   │   ├── auth.ts               # Configuração NextAuth
│   │   ├── prisma.ts             # Cliente Prisma
│   │   └── utils.ts              # Utilitários gerais
│   ├── _providers/               # Providers React
│   ├── api/                      # Rotas da API
│   │   └── auth/                 # Rotas de autenticação
│   ├── barbershops/              # Páginas de barbearias
│   │   ├── [id]/                 # Página dinâmica de barbearia
│   │   └── page.tsx              # Lista de barbearias
│   ├── bookings/                 # Páginas de agendamentos
│   ├── globals.css               # Estilos globais
│   ├── layout.tsx                # Layout raiz
│   └── page.tsx                  # Página inicial
├── prisma/                       # Configuração Prisma
│   ├── migrations/               # Migrações do banco
│   ├── schema.prisma             # Schema do banco
│   └── seed.ts                   # Dados iniciais
├── public/                       # Arquivos estáticos
├── .husky/                       # Git hooks
├── components.json               # Configuração Shadcn/UI
├── docker-compose.yml            # Configuração Docker
├── next.config.mjs               # Configuração Next.js
├── package.json                  # Dependências e scripts
├── tailwind.config.ts            # Configuração Tailwind
└── tsconfig.json                 # Configuração TypeScript
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build e Deploy
npm run build           # Gera build de produção
npm start              # Inicia servidor de produção

# Qualidade de Código
npm run lint           # Executa ESLint

# Banco de Dados (Supabase)
npm run prepare          # Configura Husky + gera cliente Prisma
npx prisma generate      # Gera cliente Prisma para Supabase
npx prisma db push       # Aplica schema ao banco Supabase
npx prisma db seed       # Popula banco com dados iniciais
npx prisma studio        # Interface visual do banco
```

## 🔧 Ferramentas de Qualidade

### ESLint + Prettier
- Configuração padronizada para Next.js
- Formatação automática com Prettier
- Plugin para ordenação de classes Tailwind

### Husky + Lint-staged
- Git hooks para qualidade de código
- Verificação automática antes de commits
- Formatação automática de arquivos staged

### Git Commit Message Linter
- Padronização de mensagens de commit
- Formato convencional de commits

## 🌐 Funcionalidades por Página

### 🏠 Página Inicial (`/`)
- Header com autenticação
- Busca por barbearias
- Filtros rápidos por tipo de serviço
- Agendamentos confirmados do usuário
- Barbearias recomendadas e populares

### 🏪 Lista de Barbearias (`/barbershops`)
- Listagem com paginação
- Filtros por serviço
- Busca por nome

### 🏪 Detalhes da Barbearia (`/barbershops/[id]`)
- Informações completas da barbearia
- Lista de serviços disponíveis
- Sistema de agendamento
- Avaliações e comentários

### 📅 Agendamentos (`/bookings`)
- Lista de agendamentos do usuário
- Filtros por status (confirmado, concluído, cancelado)
- Opções de cancelamento

## 🔐 Sistema de Autenticação

### Estratégia: JWT + Google OAuth
- **NextAuth.js** com estratégia JWT (sem adapter de banco)
- Login seguro via Google OAuth
- Criação/atualização automática de usuários no Supabase
- Sessões gerenciadas via JWT tokens

### Fluxo de Autenticação
1. Usuário faz login com Google
2. Sistema verifica/cria usuário na tabela `User` do Supabase
3. JWT token é gerado com informações do usuário
4. Sessão é mantida via cookie seguro

### Proteção de Rotas
- Middleware para rotas protegidas
- Redirecionamento automático para login
- Persistência de sessão via JWT

## 🎨 Sistema de Temas

- Suporte a tema claro e escuro
- Persistência da preferência do usuário
- Transições suaves entre temas
- Compatibilidade com preferência do sistema

## 📱 Responsividade

- Design mobile-first
- Breakpoints otimizados
- Componentes adaptativos
- Touch-friendly na mobile

## 🚦 Status do Projeto

### ✅ Implementado
- [x] Setup do banco de dados
- [x] Seeding do banco de dados
- [x] Autenticação Google OAuth
- [x] Interface com Tailwind + Shadcn/UI
- [x] Sistema de agendamentos
- [x] Busca e filtros
- [x] Git hooks e qualidade de código

### 🔄 Em Desenvolvimento
- [ ] Sistema de avaliações
- [ ] Notificações em tempo real
- [ ] Sistema de pagamentos
- [ ] Painel administrativo

## 🚀 Deploy

O projeto está configurado para deploy em:
- **Vercel** (recomendado para Next.js)
- **Supabase** (banco de dados já configurado)
- **Netlify** (alternativa para Next.js)

### Deploy Steps
1. Configure as variáveis de ambiente no provedor de deploy
2. Conecte o repositório
3. O banco Supabase já está configurado e pronto
4. Deploy automático após cada push

## 🔄 Migração para Supabase

### ✅ Alterações Realizadas

1. **Schema do Prisma atualizado** para corresponder ao banco Supabase
2. **NextAuth configurado** com estratégia JWT ao invés de database
3. **Docker removido** (não é mais necessário)
4. **Variáveis de ambiente** atualizadas para Supabase
5. **Documentação** atualizada com as novas configurações

### 🚨 Próximos Passos

1. **Configure o arquivo `.env`** com as credenciais do Supabase (use `supabase-config.env` como referência)
2. **Execute o comando**: `npx prisma generate` para gerar o cliente Prisma
3. **Teste a aplicação**: `npm run dev`
4. **Configure Google OAuth** com as credenciais corretas
5. **Deploy** quando estiver tudo funcionando

### 📋 Checklist de Verificação

- [ ] Arquivo `.env` configurado com credenciais Supabase
- [ ] Prisma client gerado (`npx prisma generate`)
- [ ] Google OAuth configurado
- [ ] Aplicação funcionando localmente
- [ ] Autenticação testada
- [ ] Deploy realizado

## 📞 Suporte

Para dúvidas ou contribuições, consulte:
- [Documentação do Supabase](https://supabase.com/docs)
- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Prisma](https://prisma.io/docs)
- [Documentação do NextAuth.js](https://next-auth.js.org)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs) 