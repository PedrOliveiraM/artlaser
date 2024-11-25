import { z } from 'zod'

export const bannerSchema = z.object({
  name: z.string().trim().min(1, { message: 'name is too short' }),
  status: z.boolean({ message: 'Is not a boolean' }),
  imageUrl: z.string().url('Invalid Url').optional(),
})

export const userSchema = z.object({
  username: z
    .string()
    .trim()
    .min(5, { message: 'Esse campo deve ter no mínimo 5 letras' }),
  email: z.string().trim().email({ message: 'Email Inválido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    .trim(),
  newPassword: z.string().trim().optional(),
})
