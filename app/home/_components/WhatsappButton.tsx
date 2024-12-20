'use client'
import { Button } from '@/components/ui/button'
import { IoLogoWhatsapp } from 'react-icons/io'

export function WhatsappButton() {
  const redirectToWhatsApp = () => {
    const phoneNumber = '+5577988438467'
    const message = encodeURIComponent('Olá! Gostaria de mais informações')
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={redirectToWhatsApp}
        variant={'success'}
        className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full shadow-lg bg-green-500 hover:bg-green-600 text-white animate-pulseSlow"
      >
        <IoLogoWhatsapp className="text-white" size={36} />
      </Button>
    </div>
  )
}
