import { Html, Head, Main, NextScript } from 'next/document'
import { useContext } from 'react'

export default function Document() {
  const grey: String = '#eee';

  return (
    <Html lang="en">
      <Head />
      <body className={`bg-[${grey}]`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
