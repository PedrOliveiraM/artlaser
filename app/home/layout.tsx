import { CartProvider } from '../context/CartContext'
import { CategoryProvider } from '../context/CategoryContext'
import { Footer } from './_components/Footer'
import { Header } from './_components/Header'

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
    icon: '/Logo-artlaser-simple.ico',
  },
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
