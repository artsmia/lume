import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'
import {
  regular as fontRegular,
  light as fontLight,
  bold as fontBold,
  black as fontBlack
} from '../theme/fonts'

import {
  primaryTextColor,
  gray60
} from '../theme/colors'

const bold = (props) => {
  if (props.bold){
    return css`
      ${fontBlack}
      letter-spacing: -.025em;
    `
  }
}
const light = (props) => {
  if (props.light){
    return css`
      ${fontLight}
      letter-spacing: -0.01em;
    `
  }
}
const uppercase = (props) => {
  if (props.uppercase){
    return css`
      text-transform: uppercase;
    `
  }
}

const lowercase = (props) => {
  if (props.lowercase){
    return css`
      text-transform: lowercase;
    `
  }
}

const align = (props) => {
  switch (props.align) {
    case "center": {
      return css`
        text-align: center;
      `
    }
    case "right": {
      return css`
        text-align: right;
      `
    }
    case "justify": {
      return css`
        text-align: justify;
      `
    }
    default:
    case "left": {
      return css`
        text-align: left;
      `
    }
  }
}



export const TextBase = css`
  ${uppercase}
  ${lowercase}
  ${bold}
  ${light}
  ${align}
`

const HBase = css`
  line-height: 1;
  ${fontBlack}
  letter-spacing: -.025em;
  color: ${primaryTextColor};
  ${TextBase}
`

const basePropTypes = {
  /** Boolean to make bold */
  bold: PropTypes.bool,
  /** Boolean to make light */
  light: PropTypes.bool,
  /** Boolean to make uppercase */
  uppercase: PropTypes.bool,
  /** Boolean to make lowercase */
  lowercase: PropTypes.bool,
  /** Boolean to align the text */
  align: PropTypes.oneOf(['left', 'right', 'center', 'justify'])
}

const baseDefaultProps = {
  bold: false,
  light: false,
  uppercase: false,
  lowercase: false,
  align: 'left'
}

export const Span = styled.span`
  font-size: 1.1rem;
  ${fontLight }
  ${TextBase}
`

Span.displayName = "Span"
Span.propTypes = basePropTypes
Span.defaultProps = baseDefaultProps


export const H1 = styled.h1`
  ${HBase}
  font-size: 3.125rem;
  margin-bottom: 1.875rem;
`
H1.displayName = "H1"
H1.propTypes = basePropTypes
H1.defaultProps = baseDefaultProps

export const H2 = styled.h2`
  ${HBase}
  font-size: 1.563rem;
  margin-bottom: 1.875rem;
`

H2.displayName = "H2"
H2.propTypes = basePropTypes
H2.defaultProps = baseDefaultProps

export const H3 = styled.h3`
  ${HBase}
  font-size: 1.031rem;
  line-height: 1.5;
`

H3.displayName = "H3"
H3.propTypes = basePropTypes
H3.defaultProps = baseDefaultProps

export const H4 = styled.h4`
  ${HBase}
  font-size: 0.8rem;
`

H4.displayName = "H4"
H4.propTypes = basePropTypes
H4.defaultProps = baseDefaultProps

export const H5 = styled.h5 `
  ${HBase}
  font-size: 0.8rem;
`
H5.displayName = "H5"
H5.propTypes = basePropTypes
H5.defaultProps = baseDefaultProps

export const P = styled.p`
  font-size: 1.031rem;
  line-height: 1.5;
  letter-spacing: -0.01em;
  ${fontLight}
  ${TextBase}
`

P.displayName = "P"
P.propTypes = basePropTypes
P.defaultProps = baseDefaultProps

export const Time = styled.time`
  font-size: 0.8rem;
  ${fontBold}
  margin-bottom: 1em;
  display: inline-block;
  ${TextBase}

`

Time.displayName = "Time"
Time.propTypes = basePropTypes
Time.defaultProps = baseDefaultProps

export const Hr = styled.hr`
  border: 1px solid ${gray60};
  clear: both;
  margin: 1.25em 0 1.875em;
  height: 0;
`

Hr.displayName = "Hr"
