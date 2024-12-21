'use client'
import React from 'react'
import Footer from './_components/Footer'
import { Header } from './_components/Header'

interface LayoutPageProps {
  children: React.ReactNode
}

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

export default function DashboardLayout({ children }: LayoutPageProps) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col px-10">
        <Header />
        <main className="w-full">{children}</main>
      </div>
      <Footer />
    </main>
  )
}
