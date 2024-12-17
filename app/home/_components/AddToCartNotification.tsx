'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ArrowRight, CheckCircle, ShoppingBag } from 'lucide-react'

interface AddToCartNotificationProps {
  onClose: () => void
  onGoToCart: () => void
}

export default function AddToCartNotification({
  onClose,
  onGoToCart,
}: AddToCartNotificationProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card className="w-full max-w-sm mx-4">
        <CardContent className="pt-6 pb-4 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <h2 className="text-2xl font-bold mb-2">Item adicionado no carrinho</h2>
          <p className="text-gray-600">
            Seu item foi adicionado com sucesso ao carrinho.
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap sm:flex-nowrap justify-between gap-2 md:flex-col md:gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto md:w-full"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Continuar comprando
          </Button>
          <Button onClick={onGoToCart} className="w-full sm:w-auto md:w-full">
            Ir para o carrinho
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
