import '@/styles/globals.css'
import Head from 'next/head'
import { Navebar, Footer } from '@/components/profiel/index'
import type { AppProps } from 'next/app'
const metadata = {
  title: 'Ft_Transcendence'
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <Navebar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
