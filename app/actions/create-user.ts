import { db } from '@/lib/prisma'
import { createUserSchema } from '@/utils/SchemasValidation'
import bcrypt from 'bcrypt'

type FormSchema = Zod.infer<typeof createUserSchema>

export const createUser = async (data: FormSchema) => {
  const hashedPassword = await bcrypt.hash(data.password, 12)

  await db.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashedPassword,
    },
  })
}
