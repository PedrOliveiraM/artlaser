// /app/api/products/route.ts

import { db } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import {
  CreateProductDTO,
  UpdateProductDTO,
  ProductResponseDTO,
} from '@/app/dto/product.dto'

export async function GET() {
  const products: ProductResponseDTO[] = await db.product.findMany({})
  return NextResponse.json(products, {
    status: 200,
  })
}

export async function POST(request: Request) {
  try {
    const body: CreateProductDTO = await request.json()
    console.log('DATA RECEBIDA : ', body)

    const createdProduct = await db.product.create({
      data: body,
    })

    if (!createdProduct) throw new Error('Erro ao criar produto!')

    return NextResponse.json({ createdProduct }, { status: 201 })
  } catch (error) {
    console.error('Erro ao processar requisição:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body: UpdateProductDTO = await request.json()
    console.log('DATA RECEIVED BY PUT:', body)

    const { id, ...updateData } = body

    // Verifica se o ID foi fornecido
    if (!id) {
      return NextResponse.json(
        { message: 'ID do produto é obrigatório' },
        { status: 400 },
      )
    }

    // Atualiza o produto no banco de dados
    const updatedProduct = await db.product.update({
      where: { id },
      data: updateData,
    })

    if (!updatedProduct) throw new Error('Erro ao atualizar produto!')

    return NextResponse.json({ updatedProduct }, { status: 200 })
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const body: { id: number } = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { message: 'ID do produto é obrigatório' },
        { status: 400 },
      )
    }

    await db.product.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Produto excluído com sucesso!' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
