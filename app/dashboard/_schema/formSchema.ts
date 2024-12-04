import { z } from 'zod'

export const formProductSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Deve ter pelo menos 2 caracteres',
    })
    .max(50, {
      message: 'O Mínimo são 50 caracteres',
    })
    .trim(),
  description: z
    .string()
    .min(10, {
      message: 'Deve ter pelo menos 10 caracteres',
    })
    .trim(),
  category: z
    .string()
    .min(2, {
      message: 'Deve ter pelo menos 2 caracteres',
    })
    .trim(),
  retailPrice: z.preprocess(
    value => Number(value),
    z
      .number()
      .positive({ message: 'O Preço deve ser maior que R$ 0.00' })
      .min(0, {
        message: 'Esse campo precisa de um preço válido',
      })
      .max(100000000, {
        message: 'O valor máximo suportado é R$ 100.000.000',
      })
  ),
  wholesalePrice: z.preprocess(
    value => Number(value),
    z
      .number()
      .positive({ message: 'O Preço deve ser maior que R$ 0.00' })
      .min(0, {
        message: 'Esse campo precisa de um preço válido',
      })
      .max(100000000, {
        message: 'O valor máximo suportado é R$ 100.000.000',
      })
  ),
  minQuantity: z.preprocess(
    value => Number(value),
    z
      .number()
      .positive({ message: 'Informe uma quantidade válida' })
      .min(0, {
        message: 'Esse campo precisa de um valor válido',
      })
      .max(100000000, {
        message: 'O valor máximo suportado é 100.000.000',
      })
  ),
  status: z.enum(['ativo', 'inativo']),
})

export const formBannerSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Deve ter pelo menos 2 caracteres',
    })
    .max(50, {
      message: 'O Mínimo são 50 caracteres',
    })
    .trim(),
  status: z.enum(['ativo', 'inativo']),
})

export const formUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(5, { message: 'Esse campo deve ter no mínimo 5 letras' }),
  email: z
    .string({ message: 'Informe o email' })
    .trim()
    .email({ message: 'Email Inválido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    .trim(),
  newPassword: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    .trim()
    .optional(),
})
