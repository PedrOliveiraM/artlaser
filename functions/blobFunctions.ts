import { toast } from '@/hooks/use-toast'
import { PutBlobResult } from '@vercel/blob'
import { RefObject } from 'react'
import { ReactCropperElement } from 'react-cropper'

export const uploadImageToBlob = async (
  filename: string,
  cropperRef: RefObject<ReactCropperElement>,
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
        const response = await fetch(`/api/blob/upload?filename=${file.name}`, {
          method: 'POST',
          body: file,
        })

        if (!response.ok) {
          reject(new Error('Failed to upload image'))
          return
        }

        const newBlob = (await response.json()) as PutBlobResult
        resolve(newBlob)
      }, 'image/png')
    })
  } catch (error) {
    console.error(`Error uploading image: ${filename}`, error)
    toast({
      title: 'Erro',
      description: 'Não foi possível salvar a imagem! Tente Novamente.',
      variant: 'destructive',
    })
    return null
  }
}

export const deleteImageFromBlob = async (
  url: string | undefined,
): Promise<boolean> => {
  try {
    const response = await fetch(`/api/blob/upload?url=${url}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`Failed to delete image: ${response.statusText}`)
    }

    return true
  } catch (error) {
    console.error('Error deleting image:', error)
    return false
  }
}
