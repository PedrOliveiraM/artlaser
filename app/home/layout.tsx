import { Inter } from 'next/font/google'
import { Header } from './_components/Header'
import { Footer } from './_components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Artlaser',
  description: 'Description of your app',
  image: '/logo.png',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
