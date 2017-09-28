import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class ClientDocument extends Document {
  render () {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()
    return (
      <html lang="en">
        <Head>
          <title>Knight Client</title>
          <link
            rel='shortcut icon'
            type='image/x-icon'
            href='/static/favicon.png'/>

          {styleTags}
        </Head>
        <body>
          <div className='root'>
              {main}
          </div>
          <NextScript />
        </body>
      </html>
    )
  }

}
