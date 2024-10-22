'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import formSchema from '../../_schema/formSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useRef, useState, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { PutBlobResult } from '@vercel/blob'

// interface IParams {
//   id: string
// }

interface IProductDto {
  name: string
  description: string
  category: string
  retailPrice: number
  wholesalePrice: number
  minQuantity: number
  imageUrl: string
  status: boolean
}

export default function AltProduct() {
  const cropperRef = useRef<ReactCropperElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState<boolean>(false)
  const [urlCroppedImage, setUrlCroppedImage] = useState<string | null>(null)
  const [blob, setBlob] = useState<PutBlobResult | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const imageUrl = URL.createObjectURL(file)
      setPreviewUrl(imageUrl)
      setShowPreview(true)
    }
  }

  const closePreview = () => {
    setShowPreview(false)
  }

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper
    const urlCropped = cropper?.getCroppedCanvas().toDataURL()
    console.log(urlCropped)
    if (urlCropped) setUrlCroppedImage(urlCropped)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      retailPrice: 0.0,
      wholesalePrice: 0.0,
      minQuantity: 0,
      status: true,
    },
  })

  const base64ToFile = (base64String: string, fileName: string): File => {
    const arr = base64String.split(',')
    const mime = arr[0].match(/:(.*?);/)![1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    return new File([u8arr], fileName, { type: mime })
  }

  const uploadImageToBlob = async (filename: string, file: File) => {
    const response = await fetch(`/api/blob/upload?filename=${filename}`, {
      method: 'POST',
      body: file,
    })

    const newBlob = (await response.json()) as PutBlobResult
    setBlob(newBlob)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    console.log(selectedFile)

    // Pegar a url
    // converter e enviar o arquivo
    if (!urlCroppedImage) throw new Error('Image crooped does not exist')

    const newCroppedImage: File = base64ToFile(urlCroppedImage, 'cropped-image')

    await uploadImageToBlob(values.name, newCroppedImage)

    if (!blob?.url) throw new Error('Url Image does exist')
    const imageUrl: string = blob!.url // A variável que contém o valor de imageUrl

    // Criando o objeto newProductDto com os valores do formulário
    const newProductDto: IProductDto = {
      ...values, // Espalha os valores do formulário
      retailPrice: values.retailPrice, // Converte retailPrice para Decimal
      wholesalePrice: values.wholesalePrice, // Converte wholesalePrice para Decimal
      imageUrl, // Adiciona o campo imageUrl
    }

    console.log('NEW PRODUCT DTO:', newProductDto)
  }

  // const deleteImageFromBlob = async (imageUrl: string) => {
  //   try {
  //     const response = await fetch(`/api/blob/upload?url=${imageUrl}`, {
  //       method: 'DELETE',
  //     })
  //     if (response.status === 200) {
  //       alert('A imagem foi removida.')
  //     } else {
  //       console.error('Erro ao deletar imagem:', response)
  //     }
  //   } catch (error) {
  //     console.error('Erro ao deletar imagem:', error)
  //   }
  // }

  return (
    <div className="flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[400px] space-y-4 p-5"
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div>
              <Label htmlFor="picture" className="text-start">
                Imagem
              </Label>
            </div>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
            />

            {previewUrl && showPreview && (
              <div className="mt-4 space-y-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <Cropper
                    src={previewUrl}
                    className="max-h-96"
                    aspectRatio={1}
                    guides={false}
                    ref={cropperRef}
                    viewMode={1}
                    dragMode="move"
                    cropBoxMovable
                    cropBoxResizable
                    autoCropArea={1}
                    background={false}
                    crop={onCrop}
                  />
                </div>
                <Button
                  onClick={closePreview}
                  variant="outline"
                  className="w-full"
                >
                  Fechar Pré-visualização
                </Button>
              </div>
            )}
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Input placeholder="Informe o nome do produto" {...field} />
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

          <Button type="submit">Salvar Produto</Button>
        </form>
      </Form>
    </div>
  )
}
