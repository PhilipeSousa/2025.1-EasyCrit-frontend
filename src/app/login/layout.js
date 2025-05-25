import './globals.css'
import { Cinzel, Roboto } from 'next/font/google'


const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cinzel',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-roboto',
})

export const metadata = {
  title: 'EasyCrit',
  description: 'Sistema de login',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={'${cinzel.variable} ${roboto.variable}'}>
      <body>{children}</body>
    </html>
  )
}