import Toast from '@/components/clientOnly'
import SessionProvider from '@/providers/session'
import { Inter } from 'next/font/google'
import { CartProvider } from './context/CartContext'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Artlaser - Presentes Personalizados e Mais',
  description:
    'Descubra presentes únicos e personalizados na Artlaser. De porta-retratos a chaveiros, encontre o item perfeito para qualquer ocasião.',
  image: '/imagens/Logo.png',
  keywords:
    'Artlaser, presentes personalizados, itens customizados, porta-retratos, chaveiros, presentes únicos',
  author: 'Equipe Artlaser',
  themeColor: '#8B4513',
  viewport: 'width=device-width, initial-scale=1.0',
  language: 'pt-BR',
  icons: {
    icon: '/Artlaser-favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        <CartProvider>
          <main>
            <SessionProvider>{children}</SessionProvider>
          </main>
        </CartProvider>
        <Toast />
      </body>
    </html>
  )
}
