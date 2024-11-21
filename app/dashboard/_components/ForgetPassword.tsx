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
import { useRouter } from 'next/navigation'

const sendEmail = () => {
  console.log('Enviando email')
}

export default function ForgetPassword() {
  const router = useRouter()
  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:text-zinc-500">
        Esqueceu a senha?
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você receberá sua senha por email !</AlertDialogTitle>
          <AlertDialogDescription>
            Certifique-se que você tenha acesso ao seu email,Pois senão nao poderá
            recupear a sua senha
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction>
            <Button type="button" onClick={sendEmail}>
              Enviar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
