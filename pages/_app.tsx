import React from 'react'
import App from 'next/app'
import { Provider as StyletronProvider } from 'styletron-react'
import { BaseProvider, LightTheme } from 'baseui'
import { styletron, debug } from '../styletron'

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
        <BaseProvider theme={ LightTheme }>
          <Component {...pageProps} />
        </BaseProvider>
      </StyletronProvider>
    )
  }
}