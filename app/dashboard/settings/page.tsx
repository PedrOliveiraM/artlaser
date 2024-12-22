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
    router.push('/signIn')
    return null
  }

  const defaultValues = {
    id: session?.user?.id || '', 
    username: session?.user?.name || '',
    email: session?.user?.email || '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  }


  return <SettingsForm {...defaultValues} />
}
