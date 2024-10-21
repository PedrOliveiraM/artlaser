import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export async function GET(): Promise<NextResponse> {
  try {
    const products = await db.product.findMany()
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
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

    // Retorna o produto criado como resposta
    return NextResponse.json(
      { message: 'Produto criado com sucesso', data: createdProduct },
      { status: 201 }, // Código 201 para "Created"
    )
  } catch (error) {
    console.error('Erro ao processar requisição:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
