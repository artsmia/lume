import App, { Container } from 'next/app'
import React from 'react'
import withApolloClient from '../apollo'
import { ApolloProvider } from 'react-apollo'
import { theme } from '../components/mia-ui'
import { ThemeProvider } from 'styled-components'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props

    let pageTheme = theme

    if (this.props.pageProps.subdomain !== 'mia') {
      pageTheme = {
        ...theme,
        font: {
          light: '"Helvetica Neue", Helvetica, san-serif',
          regular: '"Helvetica Neue", Helvetica, san-serif',
          bold: '"Helvetica Neue", Helvetica, san-serif',
          black: '"Helvetica Neue", Helvetica, san-serif'
        }
      }
    }

    return (
      <Container>
        <ThemeProvider theme={pageTheme}>
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

// class ExportApp extends App {
//   render() {
//     const { Component, pageProps } = this.props
//
//     return (
//       <Container>
//         <ThemeProvider>
//           <Component {...pageProps} />
//         </ThemeProvider>
//       </Container>
//     )
//   }
// }
//
// const ExportComponent =
//   process.env.EXPORT_MODE === 'export' ? ExportApp : withApolloClient(MyApp)

export default withApolloClient(MyApp)
