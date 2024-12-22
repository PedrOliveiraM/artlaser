'use client'
import { Label } from '@/components/ui/label'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import User from './User'
import Image from 'next/image'

export function Header() {
  const { data } = useSession()

  if (!data) redirect('/')
  return (
    <header className="flex items-center justify-between py-3">
      <div className="flex gap-2 items-center">
        <Image src="/imagens/Logo.png" alt="Logo ArtLaser" width={160} height={40} />
      </div>
      <div className="flex items-center gap-3">
        <Label className="capitalize font-bold">{data.user?.name}</Label>
        <User />
      </div>
    </header>
  )
}
