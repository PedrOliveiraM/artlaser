'use server'
import { db } from '@/lib/prisma'
import { Banner, Product } from '@prisma/client'
import { del } from '@vercel/blob'

type Response<Ttype> = {
  status: number
  data: Ttype | null
  message?: string
}

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

export async function getProductById(id: string): Promise<Response<Product>> {
  try {
    const parsedId = Number.parseInt(id, 10)

    if (Number.isNaN(parsedId)) {
      return {
        status: 400,
        data: null,
        message: `Invalid Product ID: ${id}`,
      }
    }

    const product = await db.product.findUnique({ where: { id: parsedId } })

    if (!product) {
      return {
        status: 404,
        data: null,
        message: `Product not found with ID: ${id}`,
      }
    }

    return {
      status: 200,
      message: 'Product found successfully',
      data: product,
    }
  } catch (error) {
    return {
      status: 500,
      data: null,
      message: 'An unexpected error occurred while getting product by id.',
    }
  }
}

export async function updatedProduct(data: IProductDto): Promise<Response<Product>> {
  try {
    const {
      id,
      name,
      description,
      retailPrice,
      wholesalePrice,
      category,
      minQuantity,
      status,
      imageUrl,
    } = data

    const productUpdated = await db.product.update({
      where: { id },
      data: {
        name,
        description,
        retailPrice,
        wholesalePrice,
        category,
        minQuantity,
        status,
        imageUrl,
      },
    })

    return {
      status: 200,
      message: 'Product updated successfully',
      data: productUpdated,
    }
  } catch (error) {
    return {
      status: 500,
      data: null,
      message: 'An unexpected error occurred while updating the product.',
    }
  }
}

export async function updateProductStatus(id: string): Promise<Response<Product>> {
  try {
    const parsedId = Number.parseInt(id, 10)

    if (Number.isNaN(parsedId)) {
      return {
        status: 400,
        data: null,
        message: `Invalid Product ID: ${id}`,
      }
    }

    const product = await db.product.findUnique({ where: { id: parsedId } })

    if (!product) {
      return {
        status: 404,
        data: null,
        message: `Product not found with ID: ${id}`,
      }
    }

    await db.product.update({
      where: { id: parsedId },
      data: {
        status: !product.status,
      },
    })

    return {
      status: 200,
      message: 'Product status updated successfully',
      data: null,
    }
  } catch (error) {
    return {
      status: 500,
      data: null,
      message: 'An unexpected error occurred while updating product status.',
    }
  }
}

export async function deleteProduct(id: string): Promise<Response<Product>> {
  try {
    const parsedId = Number.parseInt(id, 10)

    if (Number.isNaN(parsedId)) {
      return {
        status: 400,
        data: null,
        message: `Invalid product ID: ${id}`,
      }
    }

    const product = await db.product.findUnique({
      where: { id: parsedId },
    })

    if (!product) {
      return {
        status: 404,
        data: null,
        message: `Product not found with ID: ${id}`,
      }
    }

    const imageUrl = product.imageUrl

    const deletedProduct = await db.product.delete({
      where: { id: parsedId },
    })

    del(imageUrl)

    return {
      status: 200,
      data: deletedProduct,
      message: 'Product deleted successfully',
    }
  } catch (error) {
    return {
      status: 500,
      data: null,
      message: 'An unexpected error occurred while deleting the product.',
    }
  }
}
