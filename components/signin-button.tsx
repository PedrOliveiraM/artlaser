'use client'
import Link from 'next/link'
import { Button } from './ui/button'

export function SignIn() {
  return (
    <Button type="button" asChild>
      <Link href={'/signIn'}>Sign In</Link>
    </Button>
  )
}
