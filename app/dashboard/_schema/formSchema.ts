import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2).max(50).trim(),
  description: z.string().min(10).trim(),
  category: z.string().min(2).trim(),
  retailPrice: z.preprocess(
    (value) => Number(value),
    z.number().positive({ message: 'Retail price must be positive' }),
  ),
  wholesalePrice: z.preprocess(
    (value) => Number(value),
    z.number().positive({ message: 'Wholesale price must be positive' }),
  ),
  minQuantity: z.preprocess(
    (value) => Number(value),
    z.number().int().positive({ message: 'Minimum quantity must be positive' }),
  ),
  status: z.enum(['ativo', 'inativo']).transform((val) => {
    return val === 'ativo'
  }),
})

export default formSchema
