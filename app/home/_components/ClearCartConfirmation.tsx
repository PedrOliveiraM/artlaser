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
import { LiaBroomSolid } from 'react-icons/lia'

interface ClearCartConfirmationProps {
  clearCart: () => void
}

export function ClearCartConfirmation({ clearCart }: ClearCartConfirmationProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="w-full flex justify-end">
          <Button variant="link" size="sm" className="mt-8 flex gap-2 items-center">
            <LiaBroomSolid />
            Limpar Carrinho
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza que deseja remover tudo?</AlertDialogTitle>
          <AlertDialogDescription>
            esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <Button variant="destructive" onClick={clearCart}>
            Remover
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
