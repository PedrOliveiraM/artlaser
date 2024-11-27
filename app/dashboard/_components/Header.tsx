'use client'
import User from './User'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Label } from '@/components/ui/label'

export function Header() {
  const { data } = useSession()

  if (!data) redirect('/')
  return (
    <header className="flex items-center justify-between py-3">
      <h1 className="pt-3 text-4xl font-bold">Artlaser Dashboard</h1>
      <div className="flex items-center gap-3">
        <Label className='capitalize font-bold'>{data.user?.name}</Label>
        <User />
      </div>
    </header>
  )
}
