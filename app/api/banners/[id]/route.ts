import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }

    const banner = await db.banner.findUnique({
      where: { id: Number.parseInt(id) },
    })

    if (!banner) {
      return NextResponse.json({ message: 'banner not found' }, { status: 404 })
    }

    return NextResponse.json({ banner }, { status: 200 })
  } catch (error) {
    console.error('Error fetching banner:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
