'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { userSchema } from '@/utils/SchemasValidation'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false, // Não redireciona automaticamente
    })

    if (result?.error) {
      // Se houver erro, exibe o toast
      toast({
        title: 'Erro',
        description: 'Credenciais Inválidas',
        variant: 'destructive',
      })
      form.reset() // Reseta o formulário
    } else {
      // Se o login for bem-sucedido, redireciona para o dashboard
      router.push('/dashboard')
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card>
        <CardHeader className="text-center font-bold">Fazer Login</CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="Informe seu email" {...field} />
                    </FormControl>
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
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
