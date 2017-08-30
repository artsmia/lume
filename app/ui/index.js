import fonts from './fonts'
import theme from './theme'
import {ThemeProvider, injectGlobal} from 'styled-components'

injectGlobal`
  body {
    margin: 0;
    font-family: "Mia Regular", "Helvetica Neue", Helvetica, san-serif
  }
`

export default ({children}) => (
  <ThemeProvider
    theme={theme}
  >
    {children}
  </ThemeProvider>
)
