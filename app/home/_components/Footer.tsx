import { IoLogoWhatsapp } from 'react-icons/io'
import { AiFillInstagram } from 'react-icons/ai'

import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-orange-400 text-black">
      <div className="container mx-auto px-4 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo e descrição */}
          <div className="flex flex-col justify-center items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Image
                src="/imagens/Logo.png"
                alt="Logo ArtLaser"
                width={160}
                height={60}
              />
            </Link>
            <p className="text-base text-center">
              Transformando ideias em brindes e artes personalizadas
            </p>
          </div>

          {/* Redes sociais */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">Nossos Contatos</h3>
            <div className="flex space-x-4 justify-center items-center">
              <Link
                href="https://api.whatsapp.com/send?phone=5577988438467"
                className="flex gap-2 items-center"
              >
                <IoLogoWhatsapp size={24} />
                +55 77 98843-8467
              </Link>

              <Link
                href="https://www.instagram.com/artlaser_crr/"
                className="flex gap-2 items-center"
              >
                <AiFillInstagram size={24} strokeWidth={2} />
                @Artlaser_crr
              </Link>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-8 pt-4 border-t border-orange-200 text-center text-sm">
          <p>&copy; 2024 Artlaser. Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  )
}
