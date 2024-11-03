import { z } from 'zod'

const formSchema = z.object({
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
    (value) => Number(value),
    z
      .number()
      .positive({ message: 'O Preço deve ser maior que R$ 0.00' })
      .min(0, {
        message: 'Esse campo precisa de um preço válido',
      })
      .max(1000000, {
        message: 'O valor máximo suportado é R$ 1.000.000',
      }),
  ),
  wholesalePrice: z.preprocess(
    (value) => Number(value),
    z
      .number()
      .positive({ message: 'O Preço deve ser maior que R$ 0.00' })
      .min(0, {
        message: 'Esse campo precisa de um preço válido',
      })
      .max(1000000, {
        message: 'O valor máximo suportado é R$ 1.000.000',
      }),
  ),
  minQuantity: z.preprocess(
    (value) => Number(value),
    z
      .number()
      .positive({ message: 'Informe uma quantidade válida' })
      .min(0, {
        message: 'Esse campo precisa de um valor válido',
      })
      .max(1000000, {
        message: 'O valor máximo suportado é 1.000.000',
      }),
  ),
  status: z.enum(['ativo', 'inativo']),
})

export default formSchema
