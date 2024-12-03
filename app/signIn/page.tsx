'use client'

import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { userSchema } from '@/utils/SchemasValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { motion } from 'framer-motion' // Importação do framer-motion

export default function SignInPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    setIsLoading(true)
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false, // Não redireciona automaticamente
    })
    setIsLoading(false)
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
    <main className="flex h-screen justify-center bg-gray-100">
      {isLoading && <Loading />}

      <motion.div
        initial={{ opacity: 0, x: -50 }} // Posição inicial
        animate={{ opacity: 1, x: 0 }} // Animação de entrada
        transition={{ duration: 0.8 }} // Duração da animação
        className="flex flex-col justify-center w-full max-w-md p-8 bg-white shadow-md md:w-1/2"
      >
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Bem-vindo(a)
        </h1>
        <p className="mb-8 text-sm text-center text-gray-500">
          Faça login para acessar o painel administrativo da ArtLaser.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe seu email"
                      {...field}
                      className="text-black"
                    />
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
                    <Input
                      type="password"
                      placeholder="Digite sua senha"
                      {...field}
                      className="text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant={'login'} className="w-full">
              Entrar
            </Button>
          </form>
        </Form>
        <p className="mt-6 text-xs text-center text-gray-500">
          © 2024 ArtLaser. Todos os direitos reservados.
        </p>
        <Button variant="link" className="mt-4">
          <Link href="/forgot-password" className="text-sm text-black">
            Esqueceu a senha ?
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }} // Posição inicial
        animate={{ opacity: 1, x: 0 }} // Animação de entrada
        transition={{ duration: 0.8, delay: 0.2 }} // Duração e atraso
        className="hidden md:block md:w-1/2"
      >
        <div className="relative w-full h-full">
          <Image
            src="/imagens/Artlaser.jpeg"
            alt="Logo ArtLaser"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>
    </main>
  )
}
