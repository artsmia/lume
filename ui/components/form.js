import React from 'react'
import { Flex, Box } from 'grid-styled'
import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'
import {TextBase} from './text'
import {
  gray30,
  gray60,
  transparent,
  black as colorBlack
} from '../theme/colors'
import {
  regular,
  light
} from '../theme/fonts'


export const Form = styled.form`

`
Form.displayName = "Form"


export const Label = styled.label`
  font-size: 1.2rem;
  margin-right: 10px;
  ${regular}
  ${TextBase}
`

Label.displayName = "Label"


export const Input = styled.input`
  outline: none;
  padding: .65em;
  border-radius: 2px;
  box-shadow: inset 0 0px 0px ${transparent};
  border: solid 1px ${gray30};
  color: inherit;
  font-size: 1rem;

  &:placeholder {
    color: ${gray30};
  }
`
Input.displayName = "Input"


export const Textarea = Input.withComponent('textarea').extend`
  min-height: ${({minHeight}) => minHeight};
  width: ${({width}) => width};
`

Textarea.displayName = "Textarea"


Textarea.defaultProps = {
  minHeight: '100px',
  width: ''
}

const focusCss = css`
  width: 160px;
  background-color: rgba(255,255,255, 0.9);
  border-color: ${gray30};
  border-top: 1px solid rgba(233,232,232, 0);
  padding-left: 35px;
  color: ${colorBlack};
  cursor: auto;
  background-size: 20px;
  z-index: 30000
`

const searchFocus = ({focus}) => {
  if (focus){
    return focusCss
  }
}

export const Search = styled.input`
  background: url(https://styleguide.staging.artsmia.org/src/images/search.svg) no-repeat 8px center;
  -webkit-appearance: textfield;
  -webkit-box-sizing: content-box;
  ${light}
  font-size: 100%;
  background-size: 26px;
  border: 0;
  border-top: 1px solid rgba(233,232,232, 0);
  border-bottom: solid 1px rgba(233,232,232, 0);
  padding: .6em .4em .5em .5em;
  /* border-radius: 10em; */
  transition: all .4s ease-in-out;
  color: transparent;
  width: 26px;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

  &:focus {
    ${focusCss}
  }

  &:focus:hover {
    opacity: 1;

  }

  ${searchFocus}

  @media (max-width: 1200px) {
    right: 40px;
    top: -2px;
    background-size: 18px;
    padding: 0;

    &:focus {
      padding-left: 35px;
    }
  }

  @media (max-width: 360px) {
    margin-top: .5em;
    display: block;
  }

`
Search.displayName = "Search"
Search.propTypes = {
  focus: PropTypes.bool,
}
Search.defaultProps = {
  focus: true,
  type: 'search',
}

export const TextInput = props => (
  <Flex
    flexDirection={'column'}
    alignItems={'flex-start'}
    justifyContent={'flex-start'}
    mb={2}
  >
    <Label
      name={props.name}
    >
      {props.label}
    </Label>
    <Input
      type={'text'}
      {...props}
    />
  </Flex>
)

TextInput.displayName = "TextInput"


export const TextareaInput = props => (
  <Flex
    flexDirection={'column'}
    alignItems={'stretch'}
    justifyContent={'flex-start'}
    mb={2}
  >
    <Label
      name={props.name}
    >
      {props.label}
    </Label>
    <Textarea
      {...props}
    />
  </Flex>
)
TextareaInput.displayName = "TextareaInput"


export const Checkbox = styled.input`
  margin-right: 8px;
`

export const CheckboxInput = props => (
  <Flex
    flexDirection={'row'}
    alignItems={'baseline'}
    justifyContent={'flex-start'}
    mb={2}
  >
    <Checkbox
      type={'checkbox'}
      {...props}
    />
    <Label
      name={props.name}
    >
      {props.label}
    </Label>

  </Flex>
)

CheckboxInput.displayName = "CheckboxInput"


export const Select = styled.select`
  outline: none;
  font-size: 1.1rem;
`

Select.displayName = "Select"


export const Option = styled.option`

`
Option.displayName = "Option"
