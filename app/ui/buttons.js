import React, {Component} from 'react'
import styled from 'styled-components'

export const Button = styled.button`
  border: ${({theme, color}) => (color === "white") ? `1px solid ${theme.colors.mediumGray}` : 'none'};
  background: ${({theme, color}) => (color) ? theme.colors[color] : theme.colors.black};
  padding: .75em;
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: 0.8rem;
  outline: none !important;
  cursor: pointer;
  vertical-align: middle;
  transition: all .4s ease-in-out;
  margin-right: .5em;
  color: ${({theme, color}) => (color) ? theme.colors.black : theme.colors.white};
  text-transform: uppercase;

  &:hover {
    opacity: 0.75;
  }

  &:disabled {
    opacity: .5;
    cursor: not-allowed;
  }

`

export const Tab = styled(Button)`
  background-color: ${({theme}) => theme.colors.white};
  color: ${({theme}) => theme.colors.black};
  border: ${({theme}) => `1px solid ${theme.colors.mediumGray}`};
  margin: 0;
`
