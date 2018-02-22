import {ThemeProvider} from 'styled-components'

const gray = "#e9e8e8"

const gray30 = "rgba(35,31,32, 0.3)"

const gray60 = "rgba(35,31,32, 0.6)"

const gray85 = "rgba(35,31,32, 0.85)"

const colorBlack = "#231f20"

const blue = "#48ccdf"

const red = "#e54c60"

const purple = "#946db6"

const taupe = "#d4c6c3"

const green = "#98d789"

const white = "#ffffff"

const transparent = "rgba(35,31,32, 0)"

const light = `"Mia Light", "Helvetica Neue", Helvetica, san-serif`

const regular = `"Mia Regular", "Helvetica Neue", Helvetica, san-serif`

const bold = `"Mia Bold", "Helvetica Neue", Helvetica, san-serif`

const fontBlack = `"Mia Black", "Helvetica Neue", Helvetica, san-serif`

export const theme = {
  font: {
    light,
    regular,
    bold,
    black: fontBlack
  },
  color: {
    gray,
    gray30,
    gray60,
    gray85,
    black: colorBlack,
    blue,
    red,
    purple,
    taupe,
    green,
    white,
    transparent
  },
  primaryTextColor: colorBlack,
  alternateTextColor: white,
  primaryColor: blue,
}

export default ({children}) => (
    <ThemeProvider
      theme={theme}
    >
      {children}
    </ThemeProvider>
)
