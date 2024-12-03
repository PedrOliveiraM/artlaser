'use client'
<<<<<<< HEAD
import { SessionProvider } from 'next-auth/react'
import { Dashboard } from './_components/Dashboard'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Loading from '@/components/loading'
=======
import Loading from '@/components/loading'
import { useToast } from '@/hooks/use-toast'
import { ApiResponse } from '@/utils/ApiResponse'
import { Banner, Product } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { BannerColumns } from './_components/Banner-Columns'
import { DataTable } from './_components/DataTable'
import FieldSet from './_components/FieldSet'
import { Productcolumns } from './_components/Product-columns'
import DashboardLayout from './dashboardLayout'
>>>>>>> de628974b4579f25177a316909084aea88e583c3

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
