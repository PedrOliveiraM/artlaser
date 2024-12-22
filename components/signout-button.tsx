'use client'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

export function SignOut() {
  return (
    <button
      className="w-full flex justify-start gap-2"
      type="button"
      onClick={() =>
        signOut({
          redirectTo: '/signIn',
        })
      }
    >
      <LogOut /> Sair
    </button>
  )
}
