import {injectGlobal} from 'styled-components'

export const light = `"Mia Light", "Helvetica Neue", Helvetica, san-serif`

export const regular = `"Mia Regular", "Helvetica Neue", Helvetica, san-serif`

export const bold = `"Mia Bold", "Helvetica Neue", Helvetica, san-serif`

export const black = `"Mia Black", "Helvetica Neue", Helvetica, san-serif`

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

`
