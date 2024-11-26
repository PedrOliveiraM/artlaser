'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { signIn } from 'next-auth/react'

const formSchema = z.object({
  username: z.string().min(6, {
    message: 'Nome muito pequeno',
  }),
  password: z.string().min(6, {
    message: 'Senha muito pequena',
  }),
})

export default function SignIn() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Attempt to sign in using NextAuth credentials provider
      const result = await signIn('credentials', {
        redirect: false, // Prevent automatic redirection by NextAuth
        username: values.username, // Adjust based on your form fields
        password: values.password, // Adjust based on your form fields
      })

      if (result?.error) {
        // Handle failed login
        toast({
          title: 'Sign in failed',
          description: result.error,
          variant: 'destructive',
        })
      } else {
        // Handle successful login
        toast({
          title: 'Sign in successful',
          description: 'You have been signed in.',
        })

        // Redirect to dashboard or home page after successful login
        const router = useRouter()
        router.push('/dashboard')
      }
    } catch (error) {
      toast({
        title: 'Sign in error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-10 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Artlaser</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input placeholder="Informe seu nome de usuáro" {...field} />
                  </FormControl>
                  <FormDescription>Nunca compartilhe seu nome de usuário</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Digite sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
