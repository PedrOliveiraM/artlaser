'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { PutBlobResult } from '@vercel/blob'

import 'cropperjs/dist/cropper.css'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import Cropper from 'react-cropper'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Plus, Undo2 } from 'lucide-react'

interface CropperImageElement extends HTMLImageElement {
  cropper: Cropper // Assuming Cropper is the type from the cropperjs library
}
const productSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  retailPrice: z.preprocess(
    (value) => Number(value),
    z.number().positive({ message: 'Retail price must be positive' }),
  ),
  wholesalePrice: z.preprocess(
    (value) => Number(value),
    z.number().positive({ message: 'Wholesale price must be positive' }),
  ),
  minQuantity: z.preprocess(
    (value) => Number(value),
    z.number().int().positive({ message: 'Minimum quantity must be positive' }),
  ),
  imageTitle: z.string().min(1, { message: 'Image title is required' }),
  imagePath: z.string(), // This will be set after file upload
  status: z
    .enum(['ativo', 'pausado'])
    .transform((status) => status === 'ativo'), // Transforma 'ativo' em true e 'pausado' em false
  // Status as enum
})
export type ProductFormInputs = z.infer<typeof productSchema>

export default function ProductForm() {
  const [blob, setBlob] = useState<PutBlobResult | null>(null)

  const [image, setImage] = useState<string | null>(null) // imagem enviada pelo usuario
  const [imageName, setImageName] = useState<string>('') // imagem enviada pelo usuario
  const [croppedImage, setCroppedImage] = useState<string | null>(null) // imagem cortada
  const cropperRef = useRef<CropperImageElement | null>(null)

  const [showPreview, setshowPreview] = useState(false)
  const [showImage, setshowImage] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
  })
  const deleteImageBlob = async (blobUrl: string) => {
    const response = await fetch(`/api/avatar/upload?url=${blobUrl}`, {
      method: 'DELETE',
    })
    if (response.status === 200) {
      alert('the image has been removed')
    }
  }

  const uploadImageBlob = async () => {
    if (!croppedImage) throw new Error('Cropped Image does not exist')

    const fileCropped = await convertUrlToFile(croppedImage, imageName)

    console.log('Novo arquivo:', fileCropped, blob)

    const response = await fetch(
      `/api/avatar/upload?filename=${fileCropped.name}`,
      {
        method: 'POST',
        body: fileCropped,
      },
    )

    const newBlob = (await response.json()) as PutBlobResult

    setBlob(newBlob)
  }

  const onSubmit = async (data: ProductFormInputs) => {
    try {
      // criar blob
      uploadImageBlob()
      data.imagePath = blob!.url

      console.log('DATA ENVIADA : ', data)

      const responseProduct = await fetch(`/api/products/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!responseProduct.ok) {
        deleteImageBlob(data.imagePath)
        throw new Error('Failed to add product')
      }
      // Assuming the API response is also JSON
      const res = await responseProduct.json()

      if (res.status !== 200) {
        deleteImageBlob(data.imagePath)
        throw new Error('Não foi possivel criar esse produto')
      }
      // toast({
      //   title: 'Success',
      //   description: 'Produto adicionado com sucesso!',
      // })
    } catch (error) {
      deleteImageBlob(data.imagePath)
      // toast({ title: 'Erro', description: (error as Error).message })
      console.error(error)
    }
  }
  // recebe a imagem do usuario e salva em um state
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] // pegando a imagem
    if (!file) throw new Error('Image required') // verificando se existe
    setImageName(file.name) // guardando o nome da imagem

    console.log('Nome da imagem enviada:', imageName)
    const imageUrl = URL.createObjectURL(file) // tranformando a imagem em uma URL TEMPORARIA
    setImage(imageUrl)
    setshowImage(true)
  }

  const cropImage = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas()
      const croppedUrl = croppedCanvas.toDataURL('image/jpeg')
      setCroppedImage(croppedUrl)
      setshowPreview(true)
      setshowImage(false)
    }
  }

  const convertUrlToFile = async (
    url: string,
    fileName: string,
  ): Promise<File> => {
    const response = await fetch(url)
    const blob = await response.blob()
    return new File([blob], fileName, { type: blob.type })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Cadastrar Produto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          <label htmlFor="imageTitle">Título da Imagem</label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {image && showImage && (
            <div className="mt-5 flex max-w-sm flex-col justify-center">
              <Cropper
                src={image}
                className="max-h-96"
                aspectRatio={1} // Adjust to crop in a square ratio (or any ratio you want)
                guides={false}
                ref={cropperRef}
                viewMode={1}
                dragMode="move"
                cropBoxMovable={true}
                cropBoxResizable={true}
                autoCropArea={1}
                background={false}
              />
              <Button
                variant={'secondary'}
                type="button"
                onClick={cropImage}
                className="mt-10"
              >
                Cortar Imagem
              </Button>
            </div>
          )}

          {croppedImage && showPreview && (
            <div className="relative">
              <div className="flex flex-col justify-center gap-2">
                <h2 className="text-center font-semibold">Imagem cortada</h2>
                <Image
                  src={croppedImage}
                  alt="Cropped"
                  className="mx-auto object-cover"
                  width={215}
                  height={215}
                />
                <Button type="button" onClick={() => setshowPreview(false)}>
                  Fechar
                </Button>
              </div>
            </div>
          )}
          <div>
            <label htmlFor="imageTitle">Título da Imagem</label>
            <Input
              required
              id="imageTitle"
              {...register('imageTitle')}
              placeholder="Image Title"
            />
            {errors.imageTitle && (
              <span className="text-red-500">{errors.imageTitle.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="name">Nome do produto</label>
            <Input
              required
              id="name"
              {...register('name')}
              placeholder="Product Name"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="description">Descrição do produto</label>
            <Textarea
              required
              id="description"
              {...register('description')}
              placeholder="Product Description"
              maxLength={100}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="category">Categoria</label>
            <Input
              required
              id="category"
              {...register('category')}
              placeholder="Category"
            />
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="retailPrice">Preço de Varejo</label>
            <Input
              required
              id="retailPrice"
              type="number"
              {...register('retailPrice')}
              placeholder="Retail Price"
            />
            {errors.retailPrice && (
              <span className="text-red-500">{errors.retailPrice.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="wholesalePrice">Preço de Atacado</label>
            <Input
              required
              id="wholesalePrice"
              type="number"
              {...register('wholesalePrice')}
              placeholder="Wholesale Price"
            />
            {errors.wholesalePrice && (
              <span className="text-red-500">
                {errors.wholesalePrice.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="minQuantity">Quantidade Mínima</label>
            <Input
              required
              id="minQuantity"
              type="number"
              {...register('minQuantity')}
              placeholder="Minimum Quantity"
            />
            {errors.minQuantity && (
              <span className="text-red-500">{errors.minQuantity.message}</span>
            )}
          </div>
          <div>
            <label>Status</label>
            <div className="flex gap-4">
              <label htmlFor="ativo">
                <input
                  type="radio"
                  id="ativo"
                  value="ativo"
                  {...register('status', { required: true })}
                />
                Ativo
              </label>

              <label htmlFor="pausado">
                <input
                  type="radio"
                  id="pausado"
                  value="pausado"
                  {...register('status', { required: true })}
                />
                Pausado
              </label>
            </div>
            {errors.status && (
              <span className="text-red-500">Status é obrigatório</span>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={'/pages/dashboard'}>
          <Button type="button" variant={'alert'}>
            <Undo2 />
            Voltar
          </Button>
        </Link>
        <Button type="button" onClick={handleSubmit(onSubmit)}>
          Adicionar Produto
          <Plus />
        </Button>
      </CardFooter>
    </Card>
  )
}
