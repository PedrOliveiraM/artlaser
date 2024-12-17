export interface IProduct {
  id: number
  retailPrice: number
  wholesalePrice: number
  name: string
  description: string
  category: string
  minQuantity: number
  imageUrl: string
  status: boolean
  CreatedAt: Date
}
