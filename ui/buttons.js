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
  color: ${({theme, color}) => (color === "white") ? theme.colors.black : theme.colors.white};
  text-transform: uppercase;
  height: 40px;
  white-space: nowrap;
  z-index: inherit;

  &:hover {
    opacity: 0.75;
  }

  &:disabled {
    opacity: .5;
    cursor: not-allowed;
  }

`
