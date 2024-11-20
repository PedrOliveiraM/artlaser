import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { ApiResponse } from '@/utils/ApiResponse'
import { bannerSchema } from '@/utils/SchemasValidation'
import { Banner } from '@prisma/client'
import { z } from 'zod'

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  return 'Unknown error'
}

export async function GET(): Promise<NextResponse<ApiResponse<Banner[]>>> {
  try {
    const banners = await db.banner.findMany()

    return NextResponse.json<ApiResponse<Banner[]>>({
      status: 200,
      message: 'Banners fetched successfully',
      data: banners,
    })
  } catch (error) {
    console.error('Error fetching banners:', error)

    return NextResponse.json<ApiResponse<Banner[]>>({
      status: 500,
      message: getErrorMessage(error),
    })
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<Banner>>> {
  try {
    const body = await request.json()
    const parsedBody = bannerSchema.parse(body)

    const banner = await db.banner.create({
      data: parsedBody,
    })

    return NextResponse.json<ApiResponse<Banner>>({
      status: 201,
      message: 'Banner created successfully',
      data: banner,
    })
  } catch (error) {
    console.error('Error creating banner:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json<ApiResponse<Banner>>({
        status: 400,
        message: 'Validation Error',
        errors: error.errors.map(e => e.message),
      })
    }

    return NextResponse.json<ApiResponse<Banner>>({
      status: 500,
      message: getErrorMessage(error),
    })
  }
}
