import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class ClientDocument extends Document {


  constructor(props) {
    super(props)
    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids
    }
  }

  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(Lume => props => sheet.collectStyles(<Lume {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html lang="en">
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-32999675-8"
          />
          <script
            dangerouslySetInnerHTML={{__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-32999675-8');
            `}}
          />


          <link
            rel='shortcut icon'
            type='image/x-icon'
            href='/static/favicon.png'/>

            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"
            />
            <link
              rel="stylesheet"
              href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
              integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
              crossOrigin=""
            />
          {this.props.styleTags}
        </Head>
        <body>
          <Main/>
          <NextScript />
        </body>
      </html>
    )
  }

}
