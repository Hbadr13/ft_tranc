import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from '../components/model'
import { useState } from 'react';

// export default function App({ Component, pageProps }: AppProps) {

//   const [showNavbar, setShowNavbar] = useState(true);

//   return (
//     <>
//       <Navbar />
//       <Component className {...pageProps} showNavbar={showNavbar} />
//     </>
//   )
// }


export default function App({ Component, pageProps, router }: AppProps) {
  const isNavbarVisible = !router.asPath.startsWith('/auth/login');
  const isNavbarVisible2 = !router.asPath.startsWith('/register')
  return (
    <>
      {isNavbarVisible && isNavbarVisible2 && <Navbar />} {/* Conditionally render Navbar */}
      <Component className {...pageProps} />
    </>
  )
}
