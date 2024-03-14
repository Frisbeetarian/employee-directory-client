import React from 'react'
import type { Metadata } from 'next'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'

import './globals.css'
import { wrapper } from '@/store/store'

export const metadata: Metadata = {
  title: 'Employee Directory',
  description: 'Employee Directory',
}

// @ts-ignore
function MyApp({ Component, pageProps }): React.JSX.Element {
  return (
    <React.StrictMode>
      <ChakraProvider resetCSS>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </React.StrictMode>
  )
}

export default wrapper.withRedux(MyApp)
