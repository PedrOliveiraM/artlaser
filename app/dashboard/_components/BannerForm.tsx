import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Undo2, Link, Check } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formBannerSchema } from '../_schema/formSchema'
import { z } from 'zod'
import { ChangeEvent, RefObject, useRef } from 'react'

interface IBannerFormProps {
  onSubmit: (values: z.infer<typeof formBannerSchema>) => Promise<void>
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function BannerFormTemplate({
  onSubmit,
  handleFileChange,
}: IBannerFormProps) {
  const inputFileRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof formBannerSchema>>({
    resolver: zodResolver(formBannerSchema),
    defaultValues: {
      name: '',
      status: 'ativo',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-5">
        <h1 className="text-center text-2xl font-bold">Cadastrar Banner</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-200"
          ref={inputFileRef}
          required
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner</FormLabel>
              <FormControl>
                <Input placeholder="Informe o nome do banner" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value ? 'ativo' : 'inativo'}
                  onValueChange={field.onChange}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="ativo" />
                    </FormControl>
                    <FormLabel className="font-normal">Ativo</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="inativo" />
                    </FormControl>
                    <FormLabel className="font-normal">Inativo</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="button" variant={'alert'} className="flex items-center">
            <Undo2 size={20} />
            <Link href={'/dashboard'}>Voltar</Link>
          </Button>
          <Button type="submit" className="flex items-center">
            Salvar banner
            <Check size={20} />
          </Button>
        </div>
      </form>
    </Form>
  )
}
