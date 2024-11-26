import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { db } from './prisma'
import { userSchema } from '@/utils/SchemasValidation'
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'username', type: 'username' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { username, password } = userSchema.parse(credentials)

          const user = await db.user.findUnique({
            where: { username },
          })

          if (!user) {
            throw new Error('User not exist')
          }

          const isPassWordValid = await bcrypt.compare(password, user.password)

          if (!isPassWordValid) throw new Error('Invalid credentials.')

          return {
            id: user.id.toString(),
            email: user.email,
            username: user.username,
          }
        } catch (error) {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
})
