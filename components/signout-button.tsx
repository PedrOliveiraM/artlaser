'use client'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { Button } from './ui/button'

export function SignOut() {
  return (
    <button
      className="w-full flex justify-start gap-2"
      type="button"
      onClick={() =>
        signOut({
          redirectTo: '/signin',
        })
      }
    >
      <LogOut /> Sair
    </button>
  )
}
