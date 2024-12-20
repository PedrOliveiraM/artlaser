'use client'
import { useCart } from '@/app/context/CartContext'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface CartFooterProps {
  calculateSaved: () => number
  calculateTotal: () => number
}

export function CartFooter({ calculateSaved, calculateTotal }: CartFooterProps) {
  const { cart } = useCart()

  const handleFinishCheckout = () => {
    const products = cart.map(item => item.name).join(', ')

    console.log('Produtos:', products)

    const phoneNumber = '+556298092832'
    const message = encodeURIComponent(
      `Olá! Gostaria de mais informações sobre esses produtos: ${products}.`
    )
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="mt-8 text-right">
      <p className="text-2xl font-bold text-brown-800">
        Total: ${calculateTotal().toFixed(2)}
      </p>
      <p className="text-base font-medium text-brown-800">
        Economizou: R${calculateSaved().toFixed(2)}
      </p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
            Finalizar Pedido
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Quase lá</AlertDialogTitle>
            <AlertDialogDescription>
              Agora você será redirecionado para o whatsapp para finalizar o pedido com um
              de nossos atendentes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={handleFinishCheckout}
              >
                Continuar
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
