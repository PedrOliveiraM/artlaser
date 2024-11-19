'use server'

import { db } from '@/lib/prisma'
import { Banner, Product } from '@prisma/client'
import { del } from '@vercel/blob'

type Response<Ttype> = {
  status: number
  data: Ttype | null
  message?: string
}

export async function updateBannerStatus(id: string): Promise<Response<Banner>> {
  try {
    const parsedId = Number.parseInt(id, 10)

    if (Number.isNaN(parsedId)) {
      return {
        status: 400,
        data: null,
        message: `Invalid Banner ID: ${id}`,
      }
    }

    const banner = await db.banner.findUnique({
      where: { id: parsedId },
    })

    if (!banner) {
      return {
        status: 404,
        data: null,
        message: `Banner not found with ID: ${id}`,
      }
    }

    const updatedBanner = await db.banner.update({
      where: { id: parsedId },
      data: {
        status: !banner.status,
      },
    })

    return {
      status: 200,
      data: updatedBanner,
      message: 'Banner status updated successfully',
    }
  } catch (error) {
    return {
      status: 500,
      data: null,
      message: 'An unexpected error occurred while updating the banner status.',
    }
  }
}

export async function getBannerById(id: string): Promise<Response<Banner>> {
  try {
    const parsedId = Number.parseInt(id, 10)

    if (Number.isNaN(parsedId)) {
      return {
        status: 400,
        data: null,
        message: `Invalid Banner ID: ${id}`,
      }
    }

    const banner = await db.banner.findUnique({ where: { id: parsedId } })

    if (!banner) {
      return {
        status: 404,
        data: null,
        message: `Banner not found with ID: ${id}`,
      }
    }

    return {
      status: 200,
      message: 'Banner found successfully',
      data: banner,
    }
  } catch (error) {
    return {
      status: 500,
      data: null,
      message: 'An unexpected error occurred while getting banner by id.',
    }
  }
}

export async function deleteBanner(id: string): Promise<Response<Banner>> {
  try {
    const parsedId = Number.parseInt(id, 10)

    if (Number.isNaN(parsedId)) {
      return {
        status: 400,
        data: null,
        message: `Invalid banner ID: ${id}`,
      }
    }

    const banner = await db.banner.findUnique({
      where: { id: parsedId },
    })

    if (!banner) {
      return {
        status: 404,
        data: null,
        message: `banner not found with ID: ${id}`,
      }
    }

    const bannerUrl = banner.imageUrl

    const deletedBanner = await db.banner.delete({
      where: { id: parsedId },
    })

    del(bannerUrl)

    return {
      status: 200,
      data: deletedBanner,
      message: 'banner deleted successfully',
    }
  } catch (error) {
    return {
      status: 500,
      data: null,
      message: 'An unexpected error occurred while deleting the banner.',
    }
  }
}
