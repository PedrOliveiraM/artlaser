import { z } from 'zod'

export const bannerSchema = z.object({
  name: z.string().trim().min(1, { message: 'name is too short' }),
  status: z.boolean({ message: 'Is not a boolean' }),
  imageUrl: z.string().url('Invalid Url').optional(),
})
