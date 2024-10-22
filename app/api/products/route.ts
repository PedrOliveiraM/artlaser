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
    const body = await request.json()
    console.log('DATA RECEBIDA : ', body)

    const createdProduct = await db.product.create({
      data: body,
    })
    if (!createdProduct) throw new Error('Erro ao criar produto!')

    return Response.json({ createdProduct }, { status: 201 })
  } catch (error) {
    console.error('Erro ao processar requisição:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
