// /app/dto/product.dto.ts

import { Decimal } from '@prisma/client/runtime/library'

export interface CreateProductDTO {
  name: string
  description: string
  category: string
  retailPrice: number
  wholesalePrice: number
  minQuantity: number
  imageUrl: string
  status: boolean
}

export interface UpdateProductDTO {
  id: number
  name?: string
  description?: string
  category?: string
  retailPrice?: number
  wholesalePrice?: number
  minQuantity?: number
  imageUrl?: string
  status?: boolean
}

export interface ProductResponseDTO {
  id: number
  name: string
  description: string
  category: string
  retailPrice: Decimal
  wholesalePrice: Decimal
  minQuantity: number
  imageUrl: string
  status: boolean
  CreatedAt: Date
}
