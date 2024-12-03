import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Toast from '@/components/clientOnly'
import SessionProvider from '@/providers/session'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Artlaser',
  description: 'Aplicativo da artlaser',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        <main>
          <SessionProvider>{children}</SessionProvider>
        </main>
        <Toast />
      </body>
    </html>
  )
}
