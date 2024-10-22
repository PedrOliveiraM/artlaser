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
import ProductSchema from '../_schema/formSchema'

// Tipagem dos inputs do formulário
export type ProductFormInputs = z.infer<typeof ProductSchema>

export default function ProductForm() {
  const [blob, setBlob] = useState<PutBlobResult | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null) // Imagem enviada pelo usuário
  const [croppedImageSrc, setCroppedImageSrc] = useState<string | null>(null) // Imagem cortada
  const cropperRef = useRef<HTMLImageElement | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showCropper, setShowCropper] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(ProductSchema),
  })

  // Função para excluir o blob da imagem no servidor
  const deleteImageBlob = async (blobUrl: string) => {
    try {
      const response = await fetch(`/api/blob/upload?url=${blobUrl}`, {
        method: 'DELETE',
      })
      if (response.status === 200) {
        alert('A imagem foi removida.')
      } else {
        console.error('Erro ao deletar imagem:', response)
      }
    } catch (error) {
      console.error('Erro ao deletar imagem:', error)
    }
  }

  // Função para realizar upload da imagem cortada
  const uploadCroppedImageBlob = async () => {
    if (!croppedImageSrc) throw new Error('Imagem cortada não existe.')

    const croppedFile = await convertUrlToFile(croppedImageSrc)

    const response = await fetch(
      `/api/blob/upload?filename=${croppedFile.name}`,
      {
        method: 'POST',
        body: croppedFile,
      },
    )

    if (!response.ok) {
      throw new Error('Falha ao fazer upload da imagem.')
    }

    const uploadedBlob = (await response.json()) as PutBlobResult
    setBlob(uploadedBlob)
    return uploadedBlob
  }

  // Função que converte URL em um arquivo
  const convertUrlToFile = async (url: string): Promise<File> => {
    const response = await fetch(url)
    const blob = await response.blob()
    return new File([blob], 'cropped_image.jpg', { type: blob.type })
  }

  // Submissão do formulário
  const onSubmit = async (data: ProductFormInputs) => {
    try {
      const uploadedBlob = await uploadCroppedImageBlob()
      data.imagePath = uploadedBlob.url

      const response = await fetch(`/api/products/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Falha ao criar produto.')
      }

      alert('Produto criado com sucesso!')
    } catch (error) {
      console.error(error)
      if (blob) {
        deleteImageBlob(blob.url)
      }
      alert('Erro ao criar produto. Verifique o console para mais detalhes.')
    }
  }

  // Função que lida com o envio de imagem e exibe o cropper
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const imageUrl = URL.createObjectURL(file)
    setImageSrc(imageUrl)
    setShowCropper(true)
  }

  // Função que corta a imagem
  const cropImage = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas()
      const croppedUrl = croppedCanvas.toDataURL('image/jpeg')
      setCroppedImageSrc(croppedUrl)
      setShowPreview(true)
      setShowCropper(false)
    }
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
          <label htmlFor="imageTitle">Imagem</label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {imageSrc && showCropper && (
            <div className="mt-5 flex max-w-sm flex-col justify-center">
              <Cropper
                src={imageSrc}
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

          {croppedImageSrc && showPreview && (
            <div className="relative">
              <div className="flex flex-col justify-center gap-2">
                <h2 className="text-center font-semibold">Imagem cortada</h2>
                <Image
                  src={croppedImageSrc}
                  alt="Cropped"
                  className="mx-auto object-cover"
                  width={215}
                  height={215}
                />
                <Button type="button" onClick={() => setShowPreview(false)}>
                  Fechar
                </Button>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="imageTitle">Título da Imagem</label>
            <Input
              id="imageTitle"
              {...register('imageTitle')}
              placeholder="Título da Imagem"
            />
            {errors.imageTitle && (
              <span className="text-red-500">{errors.imageTitle.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="name">Nome do produto</label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Nome do Produto"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="description">Descrição do produto</label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Descrição do Produto"
              maxLength={100}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="category">Categoria</label>
            <Input
              id="category"
              {...register('category')}
              placeholder="Categoria"
            />
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="retailPrice">Preço de Varejo</label>
            <Input
              id="retailPrice"
              type="number"
              {...register('retailPrice')}
              placeholder="Preço de Varejo"
            />
            {errors.retailPrice && (
              <span className="text-red-500">{errors.retailPrice.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="wholesalePrice">Preço de Atacado</label>
            <Input
              id="wholesalePrice"
              type="number"
              {...register('wholesalePrice')}
              placeholder="Preço de Atacado"
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
              id="minQuantity"
              type="number"
              {...register('minQuantity')}
              placeholder="Quantidade Mínima"
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
                  value="active"
                  {...register('status')}
                />
                Ativo
              </label>
              <label htmlFor="inativo">
                <input
                  type="radio"
                  id="inativo"
                  value="inactive"
                  {...register('status')}
                />
                Inativo
              </label>
            </div>
            {errors.status && (
              <span className="text-red-500">{errors.status.message}</span>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="mt-5 flex flex-col items-center justify-center gap-2">
        <Button className="w-full" type="submit">
          <Plus className="mr-2 h-4 w-4" /> Salvar Produto
        </Button>
        <Link href="/dashboard">
          <Button variant={'outline'} className="w-full">
            <Undo2 className="mr-2 h-4 w-4" /> Voltar
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
