import { CartProvider } from '../context/CartContext'
import { CategoryProvider } from '../context/CategoryContext'
import { Footer } from './_components/Footer'
import { Header } from './_components/Header'

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
    <CategoryProvider>
      <CartProvider>
        <div className="relative min-h-screen flex flex-col  bg-orange-50">
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {children}
          </main>
          <Footer />
        </div>
      </CartProvider>
    </CategoryProvider>
  )
}
