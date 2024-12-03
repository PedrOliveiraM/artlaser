import { z } from 'zod'

export const bannerSchema = z.object({
  name: z.string().trim().min(1, { message: 'name is too short' }),
  status: z.boolean({ message: 'Is not a boolean' }),
  imageUrl: z.string().url('Invalid Url').optional(),
})

export const createUserSchema = z.object({
  username: z
    .string()
    .min(6, {
      message: 'Deve ter pelo menos 6 caracteres',
    })
    .trim(),
  email: z.string().trim().email({ message: 'Email inválido' }),
  password: z.string().trim().min(6, {
    message: 'Deve ter pelo menos 6 caracteres',
  }),
})

export const userSchema = z.object({
  email: z.string().trim().email({ message: 'Email inválido' }),
  password: z.string().trim().min(6, {
    message: 'Deve ter pelo menos 6 caracteres',
  }),
})

export const settingsSchema = z
  .object({
    username: z
      .string()
      .min(6, {
        message: 'Deve ter pelo menos 6 caracteres',
      })
      .trim(),
    email: z.string().trim().email({ message: 'Email inválido' }),
    password: z.string().trim().min(6, {
      message: 'Deve ter pelo menos 6 caracteres',
    }),
    newPassword: z.string().min(6).optional(), // Nova senha opcional
    confirmNewPassword: z.string().min(6).optional(), // Confirmar nova senha opcional
  })
  .refine(
    data => {
      // Se a nova senha foi fornecida, a confirmação deve ser igual
      if (data.newPassword && data.confirmNewPassword) {
        return data.newPassword === data.confirmNewPassword
      }
      return true // Caso contrário, apenas retorna true
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmNewPassword'], // Aponta para o campo confirmNewPassword
    }
  )
