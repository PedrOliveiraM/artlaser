'use client'

import Loading from '@/components/loading'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useToast } from '@/hooks/use-toast'
import { ApiResponse } from '@/utils/ApiResponse'
import { Banner } from '@prisma/client'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export function BannersCarousel() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [isLoaded, setIsLoaded] = useState(true)

  const { toast } = useToast()

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('/api/banners')
        const data: ApiResponse<Banner[]> = await response.json()
        setBanners(data.data || [])
        setIsLoaded(false)
      } catch (error) {
        toast({
          title: 'Erro ao buscar banners',
          description: 'Tente novamente mais tarde',
        })
        setIsLoaded(false)
      }
    }

    fetchBanners()
  }, [])

  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }))

  if (isLoaded) return <Loading />

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <div className="p-1 w-full h-full">
              <Card className="w-full h-full">
                <CardContent className="flex w-full h-full items-center justify-center md:p-6 p-1">
                  <Image
                    className="rounded-sm"
                    src={banner.imageUrl}
                    alt={banner.name}
                    width={1480}
                    height={400}
                    priority={true}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
