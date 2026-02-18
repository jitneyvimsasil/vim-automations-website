import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'vim-automations | Automating Excellence',
  description:
    'Building intelligent automation solutions — n8n workflows, AI integrations, and production web apps.',
  keywords: ['AI automation', 'n8n', 'workflow automation', 'web apps', 'AI agents'],
  authors: [{ name: 'vim-automations' }],
  openGraph: {
    title: 'vim-automations | Automating Excellence',
    description:
      'Building intelligent automation solutions that transform businesses.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'vim-automations | Automating Excellence',
    description:
      'Building intelligent automation solutions that transform businesses.',
  },
  icons: {
    icon: '/vim-automations-logo-1.png',
    apple: '/vim-automations-logo-1.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');document.documentElement.classList.add(t==='light'?'light':'dark');}catch(e){document.documentElement.classList.add('dark');}` }} />
        {children}
        <Toaster richColors position="bottom-right" />
        <Analytics />
      </body>
    </html>
  )
}
