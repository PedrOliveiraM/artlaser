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
  username: z.string().optional(),
  email: z.string().trim().email({ message: 'Email inválido' }),
  password: z.string().trim().min(6, {
    message: 'Deve ter pelo menos 6 caracteres',
  }),
})

export const settingsSchema = z.object({
  username: z
    .string()
    .min(6, {
      message: 'Deve ter pelo menos 6 caracteres',
    })
    .trim(),
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, {
      message: 'Deve ter pelo menos 6 caracteres',
    })
    .trim(),
  newPassword: z.string().optional(),
  checked: z.boolean().optional(),
})
