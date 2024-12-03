'use client'
import { UserDto } from '@/app/api/users/[id]/route'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { ApiResponse } from '@/utils/ApiResponse'
import { settingsSchema } from '@/utils/SchemasValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface IDefaultValues {
  id: string
  username: string
  email: string
  password: string
  newPassword: string
  confirmNewPassword: string
}

export default function SettingsForm(defaultValues: IDefaultValues) {
  const formSchema = settingsSchema

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('Valores do formulário:', values)
      console.log('Valor do ID:', defaultValues.id)

      const response = await fetch(`/api/users/${defaultValues.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: values.password,
          newPassword: values.newPassword,
          username: values.username,
          email: values.email,
        }),
      })

      const data: ApiResponse<UserDto> = await response.json()

      if (response.ok) {
        console.log('Usuário atualizado com sucesso:', data.data)
        toast({
          title: 'Usuário atualizado com sucesso',
          variant: 'success',
        })
      } else {
        console.error('Erro ao atualizar usuário:', data.message)
        toast({
          title: 'Erro ao atualizar usuário',
          description: data.message,
          variant: 'destructive',
        })
      }

      form.reset()
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error)
      toast({
        title: 'Ocorreu um erro no servidor',
        description: 'Tente novamente mais tarde. Ou entre em contato com o suporte.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-10 md:max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        Configurações da Conta
      </h1>
      <Card>
        <CardHeader className="bg-muted p-6 rounded-t-lg">
          <CardTitle className="text-lg font-semibold text-muted-foreground">
            Informações Pessoais
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Atualize os detalhes da sua conta aqui.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome de Usuário</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite um novo nome de usuário" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Digite um novo email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha Atual</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Digite sua senha atual"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova Senha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Digite uma nova senha"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme a Nova Senha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirme a nova senha"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button type="submit" className="w-full md:w-auto">
                  Salvar Alterações
                </Button>

                <Button type="button" variant="alert" className="w-full md:w-auto">
                  <Link href={'/dashboard'}>Voltar</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}