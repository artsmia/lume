import styled from 'styled-components'

export const Search = styled.input`
  padding-left: 35px;
  border: none;
  border-bottom: ${({theme}) => `1px solid ${theme.colors.lightMediumGray}`};
  font-family: ${({theme}) => theme.fonts.light};
  background: url(https://styleguide.staging.artsmia.org/src/images/search.svg) no-repeat 8px center;
  background-size: 20px;
  padding: .6em .4em .5em .5em;
  padding-left: 35px;
  width: 160px;
  outline: none;
  font-size: 100%;
`
