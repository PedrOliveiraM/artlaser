'use client'
import React from 'react'
import { Header } from './_components/Header'
import Footer from './_components/Footer'

interface LayoutPageProps {
  children: React.ReactNode
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
