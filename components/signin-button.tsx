'use client'
import { signIn } from 'next-auth/react'
import { Button } from './ui/button'
import Link from 'next/link'

export function SignIn() {
  return (
    <Button type="button" asChild>
      <Link href={'/signin'}>Sign In</Link>
    </Button>
  )
}
