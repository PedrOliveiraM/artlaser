import { Button } from '@/components/ui/button'
import { MapPin, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { CiInstagram } from 'react-icons/ci'

export function Contacts() {
  return (
    <div>
      <h1 className="font-semibold">Contatos</h1>
      <Button variant={'link'} asChild className="flex justify-start">
        <Link
          href="https://www.instagram.com/artlaser_crr/"
          target="_blank"
          className="text-sm font-medium transition-colors hover:text-primary "
        >
          <CiInstagram className="h-5 w-5" strokeWidth={1} />
          @artlaser_crr
        </Link>
      </Button>

      <Button variant={'link'} asChild className="flex justify-start">
        <Link
          href="https://wa.me/7788438467"
          target="_blank"
          className="text-sm font-medium transition-colors hover:text-primary "
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp
        </Link>
      </Button>

      <Button variant={'link'} asChild className="flex justify-start">
        <Link
          href="https://maps.app.goo.gl/j6TyhB8gDS39i7HM7"
          target="_blank"
          className="text-sm font-medium transition-colors hover:text-primary "
        >
          <MapPin className="h-5 w-5" />
          R. do Mercado, Correntina - BA
        </Link>
      </Button>
    </div>
  )
}
