import React from 'react'
import Head from 'next/head'
export default (props) => (
  <div>
    <Head>
      <title>{`${props.title} –– Lume`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
    </Head>

  </div>
)
