import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export async function GET() {
  const banners = await db.banner.findMany({})
  return Response.json(banners, {
    status: 200,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('DATA RECEBIDA : ', body)

    const createdBanner = await db.banner.create({
      data: body,
    })

    if (!createdBanner) throw new Error('Erro ao criar produto!')

    return Response.json({ createdBanner }, { status: 201 })
  } catch (error) {
    console.error('Erro ao processar requisição:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}
