import React, { useEffect, useState } from 'react'
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'


import { Banner } from '@prisma/client'
import { ApiResponse } from '@/utils/ApiResponse'

const OPTIONS: EmblaOptionsType = { loop: true }

export function CarouselEmbla() {
  const [banners, setBanners] = useState<string[]>([])

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('/api/banners')
        const data: ApiResponse<Banner[]> = await response.json()
        console.log(data)

        if (!data.data) return
        const imageUrls = data.data?.map(banner => banner.imageUrl)

        setBanners(imageUrls)
      } catch (error) {
        console.error('Erro ao buscar os banners:', error)
      }
    }

    fetchBanners()
  }, [])

  if (banners.length === 0) {
    return <div>Carregando...</div>
  }

  return <EmblaCarousel slides={banners} options={OPTIONS} />
}
