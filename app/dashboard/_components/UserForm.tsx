'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ForgetPassword from '../_components/ForgetPassword'
import { formUserSchema } from '../_schema/formSchema'

interface IUserProps {
  id: number
  username: string
  email: string
}

export function UserForm({ id, username, email }: IUserProps) {
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [checked, setChecked] = useState(false)
  const router = useRouter()

  const handleCheckedChange = (value: boolean | 'indeterminate') => {
    setChecked(value === true)
  }

  const form = useForm<z.infer<typeof formUserSchema>>({
    resolver: zodResolver(formUserSchema),
    defaultValues: {
      username,
      email,
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formUserSchema>) {
    try {
      const userId = id

      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
          newPassword: values.newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao atualizar usuário')
      }

      alert('Usuário atualizado com sucesso!')

    } catch (error) {
      console.error('Erro ao enviar dados:', error as string)
      alert(`Erro: ${error as string}`)
    }
  }

  return (
    <Card className="w-96 shadow-2xl">
      <CardHeader>
        <CardTitle>Configurações</CardTitle>
        <CardDescription>Troque de email, senha e nome de usuário</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do usuário</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nome do usuário"
                      {...field}
                      disabled={isDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      disabled={isDisabled}
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
                      placeholder="informe sua senha"
                      {...field}
                      type="password"
                      disabled={isDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <Checkbox
                onCheckedChange={handleCheckedChange}
                checked={checked}
                disabled={isDisabled}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Quero mudar a senha
              </label>
            </div>
            {checked && (
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="informe sua nova senha"
                        {...field}
                        type="password"
                        disabled={isDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <ForgetPassword />
            <div className="flex w-full justify-between">
              <Button variant={'alert'} onClick={() => router.push('/dashboard')}>
                Voltar
              </Button>
              <Button
                type={isDisabled ? 'button' : 'submit'}
                onClick={() => {
                  if (isDisabled) {
                    setIsDisabled(false)
                  }
                }}
              >
                {isDisabled ? 'Habilitar' : 'Salvar'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
