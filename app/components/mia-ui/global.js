import React from 'react'
import { injectGlobal } from 'styled-components'

injectGlobal`
  @font-face {
    font-family: 'iconi_mia';
    src: url("/src/fonts/iconi_mia.eot");
    src: url("/src/fonts/iconi_mia.eot?#iefix") format('embedded-opentype'),
         url("/src/fonts/iconi_mia.woff") format('woff'),
         url("/src/fonts/iconi_mia.ttf") format('truetype'),
         url("/src/fonts/iconi_mia.svg") format('svg');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "Mia Light";
    src: url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Light.eot");
    src: url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Light.eot?#iefix") format('embedded-opentype'),
         url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Light.woff") format('woff'),
         url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Light.ttf") format('truetype'),
         url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Light.svg") format('svg');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "Mia Regular";
    src: url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Regular.eot");
    src: url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Regular.eot?#iefix") format('embedded-opentype'),
         url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Regular.woff") format('woff'),
         url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Regular.ttf") format('truetype'),
         url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Regular.svg") format('svg');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "Mia Bold";
    src: url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Bold.eot");
    src: url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Bold.eot?#iefix") format('embedded-opentype'),
         url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Bold.woff") format('woff'),
         url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Bold.ttf") format('truetype'),
         url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Bold.svg") format('svg');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "Mia Black";
    src: url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Black.eot");
    src: url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Black.eot?#iefix") format('embedded-opentype'),
         url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Black.woff") format('woff'),
         url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Black.ttf") format('truetype'),
         url("https://mia-grotesk.s3.amazonaws.com/MiaGrotesk-Black.svg") format('svg');
    font-weight: normal;
    font-style: normal;
  }

  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  dl,
  blockquote,
  figure,
  table {
    margin: 0 0 1rem 0;
  }
  ul, ol {
    padding-left: 1.5rem;
  }
  ol li{
    padding-left: .25rem;
  }
  li {
    margin: 0 0 0.25rem 0;
  }
  html, body {
    height: 100%;
  }
  html {
    position: relative;
    min-height: 100%;
  }
  body {
    color: #231f20;
    font-family: "Mia Light", "Helvetica Neue", Helvetica, san-serif;
    background: #fff;

    /* Flexbox in use for sticky footer  */
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  img {
    /* width: 100%; */
    height: auto;
    max-width: 100%;
  }

  a img {
    transition: all .4s ease-in-out
  }
  a img:hover {
    opacity: 0.8;
  }


`
