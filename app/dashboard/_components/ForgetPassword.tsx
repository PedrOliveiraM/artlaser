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

const sendEmail = () => {
  console.log('Enviando email')
}

export default function ForgetPassword() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:text-zinc-500">
        Esqueceu a senha?
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você receberá sua senha no seu e-mail!</AlertDialogTitle>
          <AlertDialogDescription>
            Certifique-se de ter acesso ao seu e-mail, pois, sem ele, não será possível
            recuperar sua senha.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button type="button" onClick={sendEmail}>
              Enviar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
