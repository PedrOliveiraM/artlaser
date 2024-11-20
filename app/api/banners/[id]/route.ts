import { db } from '@/lib/prisma'
import { ApiResponse } from '@/utils/ApiResponse'
import { bannerSchema } from '@/utils/SchemasValidation'
import { Banner } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

interface IParams {
  id: string
}

const validateId = (id: string): number => {
  if (!id) {
    throw new Error('ID is required')
  }

  const parsedId = Number.parseInt(id)
  if (Number.isNaN(parsedId)) {
    throw new Error('ID must be a valid number')
  }

  return parsedId
}

const findBannerById = async (id: number): Promise<Banner> => {
  const banner = await db.banner.findUnique({ where: { id } })
  if (!banner) {
    throw new Error('Banner not found')
  }
  return banner
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<Banner>>> {
  try {
    const id = (await params).id
    const parsedId = validateId(id)

    await findBannerById(parsedId)

    const body = await request.json()
    const parsedBody = bannerSchema.parse(body)

    const updatedBanner = await db.banner.update({
      where: { id: parsedId },
      data: parsedBody,
    })

    return NextResponse.json<ApiResponse<Banner>>({
      status: 200,
      message: 'Banner updated successfully',
      data: updatedBanner,
    })
  } catch (error) {
    console.error('Error updating banner:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    const isClientError =
      errorMessage === 'ID is required' ||
      errorMessage === 'ID must be a valid number' ||
      errorMessage === 'Banner not found'

    return NextResponse.json<ApiResponse<Banner>>({
      status: isClientError ? 400 : 500,
      message: errorMessage,
    })
  }
}
