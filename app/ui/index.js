import fonts from './fonts'
import theme from './theme'
import {ThemeProvider} from 'styled-components'

export default ({children}) => (
  <ThemeProvider
    theme={theme}
  >
    {children}
  </ThemeProvider>
)
