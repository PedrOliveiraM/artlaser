'use client'
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
              <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                Continuar
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
