'use server'

import { db } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteProduct(formData: FormData) {
  const id = Number(formData.get('id'))
  return id
  // await deleteProductById(id)
  revalidatePath('/')
}

export async function updateBannerStatus(id: number) {
  const banner = await db.banner.findUnique({
    where: { id },
  })

  if (!banner) throw new Error(`The Id banner ${id} not found`)

  const updatedBanner = await db.banner.update({
    where: { id },
    data: {
      status: !banner.status,
    },
  })

  return {
    success: true,
    message: 'Product status updated successfully',
    data: updatedBanner,
  }
}
export async function updateProductStatus(id: number) {
  try {
    const product = await db.product.findUnique({ where: { id } })

    if (!product) throw new Error(`The Id Product ${id} not found`)

    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        status: !product.status,
      },
    })

    return {
      success: true,
      message: 'Product status updated successfully',
      data: updatedProduct,
    }
  } catch (error) {
    throw new Error(`Failed to update product status: ${error}`)
  }
}
