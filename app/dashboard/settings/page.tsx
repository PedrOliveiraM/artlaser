'use client'

import Loading from '@/components/loading'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import SettingsForm from '../_components/SettingsForm'

export default function SettingsPage() {
  const { data: session, status } = useSession()

  const router = useRouter()

  if (status === 'loading') {
    return <Loading />
  }

  if (!session) {
    router.push('/signin')
    return null
  }

  // Verifique o conteúdo da sessão para garantir que o id está sendo passado corretamente
  console.log('Session data:', session)

  const defaultValues = {
    id: session?.user?.id || '', // Garantindo que id seja um valor válido
    username: session?.user?.name || '',
    email: session?.user?.email || '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  }

  // Verifique os valores default para ver se o id está correto
  console.log('Default values:', defaultValues)

  return <SettingsForm {...defaultValues} />
}
