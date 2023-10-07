import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from '../components/model'
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {

  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <>
      <Navbar />
      <Component {...pageProps} showNavbar={showNavbar} />
    </>
  )
}

