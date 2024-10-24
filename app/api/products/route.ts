import { db } from '@/lib/prisma'
import { NextResponse } from 'next/server'

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
} // Adjust the import path to your actual db setup

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    console.log('DATA RECEIVED BY PUT:', body)

    // Assuming you have the product ID and fields to update in the body
    const { id, ...updateData } = body

    // Update the product in the database
    const updatedProduct = await db.product.update({
      where: { id }, // Ensure that the product ID is passed correctly
      data: updateData, // The fields to update
    })

    if (!updatedProduct) throw new Error('Error updating product!')

    return NextResponse.json({ updatedProduct }, { status: 200 })
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
