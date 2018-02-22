/* This must be in the header
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>
*/

import styled from 'styled-components'

export const Icon = styled.i`
  font-size: ${({size}) => size};
  color: ${({color}) => color};
`

Icon.displayName = "Icon"

Icon.defaultProps = {
  children: "face",
  size: "24px",
  color: "black",
  className: 'material-icons'
}
