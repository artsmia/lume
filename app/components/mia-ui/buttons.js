import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import {
  colorList,
  black as colorBlack,
  white,
  gray85,
  gray30,
  gray
} from './colors'
import { bold as fontBold } from './fonts'
import Link from 'next/link'

const display = props => {
  switch (props.display) {
    case 'inline-block': {
      return css`
        display: inline-block;
      `
    }
    case 'block': {
      return css`
        display: block;
      `
    }
    default: {
      break
    }
  }
}

const color = ({ color, theme }) => {
  switch (color) {
    case 'transparent':
    case 'white': {
      return css`
        color: ${colorBlack};
        background-color: ${theme.color[color]};
      `
    }
    default: {
      return css`
        color: ${white};
        background-color: ${theme.color[color]};
      `
    }
  }
}

const round = ({ round }) => {
  if (round) {
    return css`
      height: 50px;
      width: 50px;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
    `
  }
}

const roundSize = ({ size }) => {
  if (round && size) {
    return css`
      height: ${size};
      width: ${size};
      border-radius: ${size};
    `
  }
}

const buttonBaseStyles = css`
  border: none;
  background-color: ${colorBlack};
  padding: .75em;
  ${fontBold}
  font-size: 0.8rem;
  outline: none !important;
  cursor: pointer;
  vertical-align: middle;
  transition: all .4s ease-in-out;
  margin-right: .5em;
  color: ${white};
  text-transform: uppercase;
  text-decoration: none;
  &:hover {
    opacity: 0.75;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  ${display}
  ${color}
  ${round}
  ${roundSize}
`

const buttonBaseProps = {
  /** Boolean makes the button an a tag */
  a: PropTypes.bool,
  /** 'block', 'inline-block' */
  display: PropTypes.oneOf(['block', 'inline-block', '']),
  /** 'dark', 'light', 'super-light' */
  color: PropTypes.oneOf(['', ...colorList]),
  /** Boolean makes the button round */
  round: PropTypes.bool
}

const buttonBaseDefaultProps = {
  marginTopSmall: false,
  display: 'inline-block',
  border: '',
  color: 'black'
}

const StyledButton = styled.button`
  ${buttonBaseStyles};
`

const AButton = StyledButton.withComponent('a')

export const Button = props => {
  if (props.a) {
    return <AButton {...props} />
  } else {
    return <StyledButton {...props} />
  }
}

Button.displayName = 'Button'
Button.propTypes = buttonBaseProps
Button.defaultProps = buttonBaseDefaultProps

export const NavButton = props => (
  <Link href={props.href} as={props.as}>
    <Button a round size={props.size} href={props.as}>
      {props.children}
    </Button>
  </Link>
)
