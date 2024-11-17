'use client'
import CircularIndeterminate from '@/components/loading'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { deleteImageFromBlob, uploadFileImageToBlob } from '@/functions/blobFunctions'
import capitalizeWords from '@/functions/capitalizeWords'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { PutBlobResult } from '@vercel/blob'
import 'cropperjs/dist/cropper.css'
import { Check, Undo2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formBannerSchema } from '../_schema/formSchema'

interface IBannerDto {
  name: string
  status: boolean
  imageUrl?: string
}

export default function AddBanner() {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [blobResult, setBlobResult] = useState<PutBlobResult | null>(null)
  const [image, setImage] = useState<File | null>(null)

  const [uploading, setUploading] = useState<boolean>(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formBannerSchema>>({
    resolver: zodResolver(formBannerSchema),
    defaultValues: {
      name: '',
      status: 'ativo',
    },
  })

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImage(file) // Armazena a imagem
    }
  }

  const createBanner = async (
    bannerData: IBannerDto
  ): Promise<IBannerDto | undefined> => {
    try {
      const response = await fetch('/api/banners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bannerData),
      })
      if (!response.ok) {
        throw new Error('Erro ao criar o banner')
      }

      const result: { createdBanner: IBannerDto } = await response.json() // Tipando o resultado esperado

      return result.createdBanner
    } catch (error) {
      console.error('Erro:', error)
      console.error('Banner IMAGE URL DEL:', bannerData.imageUrl)
      deleteImageFromBlob(bannerData.imageUrl)
      return undefined
    }
  }

  async function onSubmit(values: z.infer<typeof formBannerSchema>) {
    try {
      setUploading(true)
      const newBlobResult = await uploadFileImageToBlob(values.name, image)

      if (!newBlobResult) throw new Error('Não foi possível enviar a imagem')
      setBlobResult(newBlobResult)

      const imageUrl = newBlobResult.url
      const booleanStatus = values.status === 'ativo'

      const formatName = capitalizeWords(values.name)

      const newBannerDto: IBannerDto = {
        ...values,
        name: formatName,
        status: booleanStatus,
        imageUrl,
      }

      const createdBanner = await createBanner(newBannerDto)

      if (!createdBanner) throw new Error('Não foi possível criar o banner')

      setUploading(false)
      toast({
        title: 'Salvo com sucesso',
        description: 'Banner criado com sucesso!',
        variant: 'success',
      })

      router.push('/dashboard')
    } catch (error) {
      setUploading(false)
      console.error('Error submitting form:', error)
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o banner! Tente Novamente.',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      {uploading && <CircularIndeterminate />}
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
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
        </div>
      </div>
    </>
  )
}
