"use client"

import * as React from "react"
import { cn } from "../../_lib/utils"

export interface PhoneInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, ...props }, ref) => {
    const [digits, setDigits] = React.useState("")

    const formatDisplay = (numbers: string) => {
      if (numbers.length === 0) {
        return ""
      }

      // Limita a 11 dígitos (DDD + número)
      const limited = numbers.slice(0, 11)
      
      // Formata conforme o padrão brasileiro
      if (limited.length <= 2) {
        return `+55 (${limited}`
      } else if (limited.length <= 7) {
        return `+55 (${limited.slice(0, 2)}) ${limited.slice(2)}`
      } else {
        return `+55 (${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Permite apenas números, backspace, delete, e teclas de navegação
      if (
        !/[0-9]/.test(e.key) && 
        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
      ) {
        e.preventDefault()
        return
      }

      let newDigits = digits

      if (e.key === 'Backspace') {
        newDigits = digits.slice(0, -1)
      } else if (e.key === 'Delete') {
        newDigits = ""
      } else if (/[0-9]/.test(e.key) && digits.length < 11) {
        newDigits = digits + e.key
      }

      if (newDigits !== digits) {
        setDigits(newDigits)
        
        // Notifica o parent component
        if (onChange) {
          const formattedValue = formatDisplay(newDigits)
          const syntheticEvent = {
            target: { value: formattedValue }
          } as React.ChangeEvent<HTMLInputElement>
          onChange(syntheticEvent)
        }
      }

      // Previne o comportamento padrão para números
      if (/[0-9]/.test(e.key)) {
        e.preventDefault()
      }
    }

    const handleChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
      // Não faz nada aqui para evitar loops
      // Toda lógica está no handleKeyDown
    }

    const displayValue = formatDisplay(digits)

    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-0",
          className
        )}
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="+55 (11) 99999-9999"
        {...props}
      />
    )
  }
)
PhoneInput.displayName = "PhoneInput"

export { PhoneInput } 