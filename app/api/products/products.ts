import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export async function GET() {
  const products = await db.product.findMany({})
  return Response.json(products, {
    status: 200,
  })
}

export async function POST(request: Request) {
  try {
    // Parse o corpo da requisição
    const body = await request.json()
    console.log('DATA RECEBIDA : ', body)
    // Criação do produto no banco de dados
    const createdProduct = await db.product.create({
      data: body,
    })
    if (!createdProduct) throw new Error('Erro ao criar produto!')

    console.log('PRODUTO CRIADO : ', createdProduct)
    return Response.json({}, { status: 201 })
  } catch (error) {
    console.error('Erro ao processar requisição:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
