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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { deleteImageFromBlob, uploadFileImageToBlob } from '@/functions/blobFunctions'
import capitalizeWords from '@/functions/capitalizeWords'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formBannerSchema } from '../_schema/formSchema'
import { PutBlobResult } from '@vercel/blob'
import Link from 'next/link'
import { ApiResponse } from '@/utils/ApiResponse'
import { Banner } from '@prisma/client'

interface IBannerFormProps {
  type: 'Cadastrar' | 'Alterar'
  data: IBannerDto | null
  defaultValues: IDefaultValues
}

interface IBannerDto {
  id?: string
  name?: string
  status?: boolean
  imageUrl?: string
}
interface IDefaultValues {
  id: number | undefined
  name: string | undefined
  status: 'ativo' | 'inativo'
  imageUrl?: string | undefined
}

export default function BannerFormTemplate({
  type,
  data,
  defaultValues,
}: IBannerFormProps) {
  const [uploading, setUploading] = useState<boolean>(false)
  const [image, setImage] = useState<File | null>(null)
  const [blobImage, setBlobImage] = useState<PutBlobResult | null>(null)
  const inputFileRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formBannerSchema>>({
    resolver: zodResolver(formBannerSchema),
    defaultValues,
  })

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Formato inválido',
        description: 'Somente imagens JPEG ou PNG são permitidas.',
        variant: 'destructive',
      })
      return
    }

    setImage(file)
  }

  const sendBannerRequest = async (
    url: string,
    method: 'POST' | 'PUT',
    bannerData: IBannerDto
  ): Promise<IBannerDto | undefined> => {
    try {
      const response: ApiResponse<Banner> = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bannerData),
      })

      if (response.status !== 200)
        throw new Error(`Erro ao ${method === 'POST' ? 'criar' : 'atualizar'} o banner`)

      const result: IBannerDto = {
        id: response.data?.id.toString(),
        name: response.data?.name,
        imageUrl: response.data?.imageUrl,
        status: response.data?.status,
      }

      return result
    } catch (error) {
      console.error('Erro:', error)
      deleteImageFromBlob(bannerData.imageUrl)
      return undefined
    }
  }

  const onSubmit = async (values: z.infer<typeof formBannerSchema>) => {
    try {
      setUploading(true)

      let imageUrl = data?.imageUrl
      console.log('Imagem', image)
      if (image) {
        if (data?.imageUrl) {
          const deleteSuccess = await deleteImageFromBlob(data.imageUrl)
          if (!deleteSuccess) {
            toast({
              title: 'Erro',
              description: 'Não foi possível remover a imagem antiga do banner!',
              variant: 'destructive',
            })
            setUploading(false)
            return
          }
        }

        const newBlobResult = await uploadFileImageToBlob(values.name, image)
        if (!newBlobResult) {
          throw new Error('Erro ao fazer o upload da nova imagem.')
        }

        imageUrl = newBlobResult.url // Atualiza a URL da imagem
      }

      const booleanStatus = values.status === 'ativo'
      const formatName = capitalizeWords(values.name)

      const newBannerDto: IBannerDto = {
        ...values,
        name: formatName,
        status: booleanStatus,
        imageUrl,
      }

      // Lógica de envio da requisição
      if (type === 'Alterar') {
        const updatedBanner = await sendBannerRequest(
          `/api/banners/${data?.id}`,
          'PUT',
          newBannerDto
        )
        if (!updatedBanner) {
          throw new Error('Não foi possível atualizar o banner')
        }
      } else {
        const createdBanner = await sendBannerRequest(
          '/api/banners',
          'POST',
          newBannerDto
        )
        if (!createdBanner) {
          throw new Error('Não foi possível criar o banner')
        }
      }

      setUploading(false)
      toast({
        title: 'Salvo com sucesso',
        variant: 'success',
      })

      router.push('/dashboard')
    } catch (error) {
      setUploading(false)
      toast({
        title: 'Erro',
        description: `Não foi possível ${type === 'Cadastrar' ? 'criar' : 'atualizar'} o banner!`,
        variant: 'destructive',
      })
      console.error(error)
    }
  }

  return (
    <>
      {uploading && <Loading />}
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-5">
              <h1 className="text-center text-2xl font-bold">{type} Banner</h1>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-200"
                ref={inputFileRef}
                required={type === 'Cadastrar'}
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
