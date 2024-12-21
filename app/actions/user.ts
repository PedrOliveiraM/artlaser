'use server'

import { signIn } from '@/lib/auth'
import { db } from '@/lib/prisma'
import { CredentialsSignin } from 'next-auth'
import { redirect } from 'next/navigation'

const login = async (formData: FormData): Promise<void> => {
  const email = formData.get('email') as string | null
  const password = formData.get('password') as string | null

  if (!email || !password) {
    return
  }

  try {
    await signIn('credentials', {
      redirect: false,
      callbackUrl: '/dashboard',
      email,
      password,
    })
    redirect('/dashboard') // Redireciona apenas em caso de sucesso.
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      console.error('Erro de autenticação:', error)
    } else {
      console.error('Erro inesperado:', error)
    }
  }
}

const fetchAllUsers = async () => {
  try {
    const users = await db.user.findMany({})
    return users.map(user => ({
      id: user.id,
      email: user.email,
    }))
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    throw new Error('Não foi possível buscar os usuários.')
  }
}

export { login, fetchAllUsers }
