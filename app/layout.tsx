import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'vim-automations | AI Automation Portfolio',
  description:
    'Building intelligent automation solutions — n8n workflows, AI integrations, and production web apps.',
  keywords: ['AI automation', 'n8n', 'workflow automation', 'web apps', 'AI agents'],
  authors: [{ name: 'vim-automations' }],
  openGraph: {
    title: 'vim-automations | AI Automation Portfolio',
    description:
      'Building intelligent automation solutions that transform businesses.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'vim-automations | AI Automation Portfolio',
    description:
      'Building intelligent automation solutions that transform businesses.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
