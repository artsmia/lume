import styled from 'styled-components'

function hStyles(props) {
  return`
    letter-spacing: -.025em;
    font-family: ${props.theme.fonts.black};
    line-height: 1;
    margin: 0;
  `
}


export const H1 = styled.h1`
  ${(props) => hStyles(props)}
  font-size: 3.125rem;
`

export const H2 = styled.h2`
  ${(props) => hStyles(props)}
  font-size: 1.563rem;
`

export const H3 = styled.h3`
  ${(props) => hStyles(props)}
  font-size: 1.031rem;
`

export const H4 = styled.h4`
  ${(props) => hStyles(props)}
  font-size: .8rem;
`
