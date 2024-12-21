import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { db } from './prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      authorize: async credentials => {
        try {
          const email = credentials.email as string | undefined
          const password = credentials.password as string | undefined

          if (!email || !password) return null

          const user = await db.user.findUnique({
            where: { email: email as string },
          })

          if (!user || !user.password) return null

          const isPasswordValid = await bcrypt.compare(password as string, user.password)

          if (!isPasswordValid) return null

          return {
            id: user.id.toString(),
            name: user.username,
            email: user.email,
            image: 'avatar',
          }
        } catch (error) {
          return null
        }
      },
    }),
  ],

  pages: {
    signIn: '/signin',
    error: '/error',
  },
  debug: false,

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
})
