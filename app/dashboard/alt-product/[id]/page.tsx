'use client'
import { Button } from '@/components/ui/button'
import { PutBlobResult } from '@vercel/blob'
import 'cropperjs/dist/cropper.css'
import { ChangeEvent, useRef, useState } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'

export default function AltProduct() {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const cropperRef = useRef<ReactCropperElement>(null)
  const [blobResult, setBlobResult] = useState<PutBlobResult | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const newImageUrl = URL.createObjectURL(file)
      setImageUrl(newImageUrl) // Armazena o URL da nova imagem
      cropperRef.current?.cropper.replace(newImageUrl) // Substitui a imagem do cropper
    }
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cropper = cropperRef.current?.cropper
    if (!cropper) {
      throw new Error('Cropper not found')
    }

    // Convert the cropped image to Blob
    cropper.getCroppedCanvas().toBlob(async (blob) => {
      if (!blob) {
        throw new Error('Failed to create Blob from cropped image')
      }

      const file = new File([blob], `cropped-image-${Date.now()}.png`, {
        type: 'image/png',
      })

      // Upload the cropped image to Vercel Blob
      const response = await fetch(`/api/blob/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const newBlob = (await response.json()) as PutBlobResult
      setBlobResult(newBlob)
      setImageUrl(null) // Limpa a imagem após o envio
    }, 'image/png')
  }

  const handleClosePreview = () => {
    setImageUrl(null) // Fechar a pré-visualização
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Cortar Imagem</h1>

        <form onSubmit={submit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-200"
            ref={inputFileRef}
            required
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
          <Button type="submit">Enviar imagem cortada para o blob</Button>
        </form>
      </div>
      {blobResult && (
        <div className="mt-4">
          Blob URL: <a href={blobResult.url}>{blobResult.url}</a>
        </div>
      )}
    </div>
  )
}
