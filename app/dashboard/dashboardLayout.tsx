// layout.tsx
'use client'
import React from 'react'
import { Header } from './_components/Header'
import Footer from './_components/Footer'

interface LayoutPageProps {
  children: React.ReactNode
  onFilterChange: (filter: string) => void
}

export default function DashboardLayout({
  children,
  onFilterChange,
}: LayoutPageProps) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:px-6 sm:py-4">
        <Header onFilterChange={onFilterChange} />
        <main className="grid flex-1 items-start gap-2 bg-muted/40 p-4 sm:px-6 sm:py-0 md:gap-4">
          {children}
        </main>
      </div>
      <Footer />
    </main>
  )
}
