'use client'
import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonHomePage() {
  return (
    <main className="min-h-screen">
      {/* Skeleton para o carousel */}
      <div className="p-1 w-full h-full">
        <div className="w-full h-[400px]">
          <Skeleton className="w-full h-full rounded-sm" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:py-4">
        <div className="flex flex-col justify-center">
          {/* Skeleton para o SearchMenu */}
          <div className="mb-4">
            <Skeleton className="w-full h-10 rounded-sm" />
          </div>

          {/* Skeleton para os cards de produtos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-[200px] rounded-sm" />
            ))}
          </div>

          {/* Skeleton para a paginação */}
          <div className="flex justify-center items-center mt-6">
            <Skeleton className="w-24 h-10 rounded-sm mx-2" />
            <Skeleton className="w-24 h-10 rounded-sm mx-2" />
            <Skeleton className="w-24 h-10 rounded-sm mx-2" />
          </div>
        </div>
      </div>
    </main>
  )
}
