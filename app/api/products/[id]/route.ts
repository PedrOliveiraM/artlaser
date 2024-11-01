import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    const product = await db.product.findUnique({
      where: { id: parseInt(id) },
    })

    if (!product) throw new Error('Error updating product!')

    return NextResponse.json({ product }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

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
