import React from 'react'
import Head from 'next/head'
export default (props) => (
  <div>
    <Head>
      <title>{`${props.title} –– Lume`}</title>
      {props.analyticsId ? (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${props.analyticsId}`}
        />

      ):null}
      {props.analyticsId ? (
        <script
          dangerouslySetInnerHTML={{__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${props.analyticsId}');
          `}}
        />

      ):null}

      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
    </Head>

  </div>
)
