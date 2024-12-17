'use client'
import { Label } from '@/components/ui/label'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import User from './User'

export function Header() {
  const { data } = useSession()

  if (!data) redirect('/')
  return (
    <header className="flex items-center justify-between py-3">
      <h1 className="pt-3 text-4xl font-bold">Artlaser Dashboard</h1>
      <div className="flex items-center gap-3">
        <Label className="capitalize font-bold">{data.user?.name}</Label>
        <User />
      </div>
    </header>
  )
}
