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
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { PutBlobResult } from '@vercel/blob'
import 'cropperjs/dist/cropper.css'
import { ChangeEvent, useRef, useState } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import formSchema from '../_schema/formSchema'
import capitalizeWords from '@/functions/capitalizeWords'
import Link from 'next/link'
import { Check, Undo2 } from 'lucide-react'
import { Decimal } from '@prisma/client/runtime/library'
import { updatedProduct } from '../_actions/actions'

interface IProductDto {
  id: number
  name: string
  description: string
  category: string
  retailPrice: number
  wholesalePrice: number
  minQuantity: number
  imageUrl: string
  status: boolean
}

interface IParamsProduct {
  data: {
    imageUrl: string
    id: number
    name: string
    description: string
    category: string
    retailPrice: Decimal
    status: boolean
    wholesalePrice: Decimal
    minQuantity: number
    CreatedAt: Date
  }
}

export default function ProductForm({ data }: IParamsProduct) {
  console.log(data)
  const inputFileRef = useRef<HTMLInputElement>(null)
  const cropperRef = useRef<ReactCropperElement>(null)
  const [blobResult, setBlobResult] = useState<PutBlobResult | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const [uploading, setUploading] = useState<boolean>(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name || '',
      description: data.description || '',
      category: data.category || '',
      retailPrice: parseFloat(data.retailPrice.toString()) || 0.0,
      wholesalePrice: parseFloat(data.wholesalePrice.toString()) || 0.0,
      minQuantity: data.minQuantity || 0,
      status: data.status ? 'ativo' : 'inativo',
    },
  })

  const handleClosePreview = () => {
    setImageUrl(null)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const newImageUrl = URL.createObjectURL(file)
      setImageUrl(newImageUrl) // Armazena o URL da nova imagem
      cropperRef.current?.cropper.replace(newImageUrl) // Substitui a imagem no cropper
    } else {
      setImageUrl(null) // Se não há arquivo, usa a URL antiga
    }
  }

  const uploadImageToBlob = async (
    filename: string,
  ): Promise<PutBlobResult | null> => {
    try {
      const cropper = cropperRef.current?.cropper
      if (!cropper) {
        throw new Error('Cropper not found')
      }

      // Convert the cropped image to Blob
      return new Promise((resolve, reject) => {
        cropper.getCroppedCanvas().toBlob(async (blob) => {
          if (!blob) {
            reject(new Error('Failed to create Blob from cropped image'))
            return
          }

          const file = new File([blob], `${filename}-${Date.now()}.png`, {
            type: 'image/png',
          })

          // Upload the cropped image to Vercel Blob
          const response = await fetch(
            `/api/blob/upload?filename=${file.name}`,
            {
              method: 'POST',
              body: file,
            },
          )

          if (!response.ok) {
            reject(new Error('Failed to upload image'))
            return
          }

          const newBlob = (await response.json()) as PutBlobResult
          setBlobResult(newBlob)
          resolve(newBlob) // Retorna o novo blob para o chamador
        }, 'image/png')
      })
    } catch (error) {
      console.error(`Error uploading image: ${blobResult}`, error)
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar a imagem! Tente Novamente.',
        variant: 'destructive',
      })
      return null
    }
  }

  const deleteImageFromBlob = async (
    url: string | undefined,
  ): Promise<boolean> => {
    try {
      const response = await fetch(`/api/blob/upload?url=${url}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Failed to delete image: ${response.statusText}`)
      }

      return true // Indicate success
    } catch (error) {
      console.error('Error deleting image:', error)
      return false
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setUploading(true)

      let finalImageUrl = data.imageUrl // Preserva a URL da imagem antiga

      // Verifica se uma nova imagem foi carregada
      if (imageUrl) {
        const newBlobResult = await uploadImageToBlob(values.name)
        if (!newBlobResult) throw new Error('Não foi possível enviar a imagem')
        finalImageUrl = newBlobResult.url

        // Se a imagem foi alterada, exclua a antiga
        if (data.imageUrl) {
          await deleteImageFromBlob(data.imageUrl)
        }
      }

      const booleanStatus = values.status === 'ativo'
      const formatName = capitalizeWords(values.name)
      const formatDescription = capitalizeWords(values.description)
      const formatCategory = capitalizeWords(values.category)

      const newProductDto: IProductDto = {
        ...values,
        id: data.id,
        name: formatName,
        category: formatCategory,
        description: formatDescription,
        retailPrice: values.retailPrice,
        wholesalePrice: values.wholesalePrice,
        status: booleanStatus,
        imageUrl: finalImageUrl, // Usa a imagem final (nova ou antiga)
      }

      const product = await updatedProduct(newProductDto)
      console.log('Returned product:', product)

      setUploading(false)
      toast({
        title: 'Salvo com sucesso',
        description: 'Produto alterado com sucesso!',
        variant: 'success',
      })
    } catch (error) {
      setUploading(false)
      console.error('Error submitting form:', error)
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o produto! Tente Novamente.',
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-5"
            >
              <h1 className="text-center text-2xl font-bold">
                Alterar Produto
              </h1>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-200"
                ref={inputFileRef}
              />

              {imageUrl && ( // Verifica se imageUrl não é nulo
                <>
                  <Cropper
                    className="mb-4 max-h-96"
                    aspectRatio={1}
                    guides={false}
                    ref={cropperRef}
                    viewMode={1}
                    dragMode="move"
                    cropBoxMovable
                    cropBoxResizable
                    autoCropArea={1}
                    background={false}
                    src={imageUrl} // Define a imagem a ser cortada
                  />
                  <div className="flex justify-between">
                    <Button type="button" onClick={handleClosePreview}>
                      Fechar Pré-visualização
                    </Button>
                  </div>
                </>
              )}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produto</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe o nome do produto"
                        {...field}
                        defaultValue={'pedro de teixeira'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Informe a descrição do produto"
                        {...field}
                        maxLength={125}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe a categoria do produto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="retailPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço de Varejo</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Preço do produto a varejo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wholesalePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço de Atacado</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Preço do produto em atacado"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade Para Atacado</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Quantidade Mínima para atacado"
                        {...field}
                      />
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
                <Button
                  type="button"
                  variant={'alert'}
                  className="flex items-center"
                >
                  <Undo2 size={20} />
                  <Link href={'/dashboard'}>Voltar</Link>
                </Button>
                <Button type="submit" className="flex items-center">
                  Salvar Produto
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
