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

// interface IParams {
//   id: string
// }

export default function AltProduct() {
  const cropperRef = useRef<ReactCropperElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState<boolean>(false)

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
    console.log(cropper?.getCroppedCanvas().toDataURL())
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    console.log(selectedFile)
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid w-full max-w-sm items-center justify-center gap-4">
            <Label htmlFor="picture">Imagem</Label>
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
