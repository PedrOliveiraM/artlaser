'use client'
import { SessionProvider } from 'next-auth/react'
import { Dashboard } from './_components/Dashboard'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Loading from '@/components/loading'

export default function Administrator() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Se a sessão não existir, redireciona para a página de login
  if (status === 'loading') {
    return <Loading /> // Exibe um carregamento enquanto verifica a sessão
  }

  if (!session) {
    router.push('/signin') // Redireciona para login
    return null
  }

  return (
    <SessionProvider session={session}>
      <Dashboard />
    </SessionProvider>
  )
}
