import App, { Container } from 'next/app'
import React from 'react'
import withApolloClient from '../apollo'
import { ApolloProvider } from 'react-apollo'
import ThemeProvider from '../components/mia-ui'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props

    return (
      <Container>
        <ThemeProvider>
          <DragDropContextProvider backend={HTML5Backend}>
            <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloProvider>
          </DragDropContextProvider>
        </ThemeProvider>
      </Container>
    )
  }
}

class ExportApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    )
  }
}

let ExportComponent =
  process.env.EXPORT_MODE === 'export' ? ExportApp : withApolloClient(MyApp)

export default ExportComponent
