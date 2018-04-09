import React, {Component} from 'react'
import { Flex, Box } from 'grid-styled'
import styled, {css, keyframes} from 'styled-components'
import PropTypes from 'prop-types'
import {TextBase} from './text'
import {
  gray30,
  gray60,
  transparent,
  black as colorBlack,
  blue,
  green,
  red
} from './colors'
import {
  regular,
  light,
  bold
} from './fonts'


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
TextInput.propTypes = {
  label: PropTypes.string,
}
TextInput.defaultProps = {
  label: '',
}

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
TextareaInput.propTypes = {
  label: PropTypes.string,
  minHeight: PropTypes.string,
  width: PropTypes.string,

}
TextareaInput.defaultProps = {
  label: '',
  minHeight: '',
  width: '',
}

export const Checkbox = styled.input`
  margin-right: 8px;
`

Checkbox.displayName = 'Checkbox'

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
CheckboxInput.displayName = "CheckboxInput"
CheckboxInput.propTypes = {
  label: PropTypes.string,
}
CheckboxInput.defaultProps = {
  label: '',
}

export const Select = styled.select`
  outline: none;
  font-size: 1.1rem;
`

Select.displayName = "Select"


export const Option = styled.option`

`
Option.displayName = "Option"




const tiedye = keyframes`
  0% {
    background-position: 0% 50%;
  }
    50% {
      background-position: 100% 50%;
  }
  100% {
  background-position: 0% 50%;
  }
`

const ColorLine = styled.div`
  height: 2px;
  width: 100%;
  background: linear-gradient(to right, ${blue}, ${green}, ${red});
  background-size: 110% 110%;
  animation: ${tiedye} 5s ease infinite;
`
const ColorBox = styled.div`
  height: 120px;
  width: 100%;
  background: linear-gradient(to right, ${blue}, ${green}, ${red});
  background-size: 110% 110%;
  animation: ${tiedye} 5s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
`



const TitleInput = styled.input`
  font-size: 2.5rem;
  ${bold};
  &:placeholder {
    color: ${gray60};
  }
  height: 150px
  width: 100%;
  padding: 5px;
  background-color: white;
  border: 1px solid ${gray30};
  border-radius: 4px;
`

const TitleLabel = styled.label`
  display: none;
`

export const Title = ({name, value, onChange, label}) => (
  <Flex
    mb={3}
    flexDirection={'column'}
    pr={5}
  >
    <TitleLabel
      name={name}
    >
      {label}
    </TitleLabel>
    <TitleInput
      name={name}
      value={value}
      onChange={onChange}
      placeholder={"Add a title here."}
    />

  </Flex>
)

const DescriptionTextarea = styled.textarea`
  resize: none;
  border: none;
  width: 100%;
  height: 200px;
  padding: 5px;
  font-size: 14px;
  ${regular};
  border: 1px solid ${gray30};
  border-radius: 4px;
`
const DescriptionLabel = styled.label`
  display: none;
`

export const Description = ({name, value, onChange, label}) => (
  <Flex
    mb={3}
    pr={5}
    flexDirection={'column'}
  >
    <DescriptionLabel
      name={name}
    >
      {label}
    </DescriptionLabel>
    <DescriptionTextarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={"Enter a description here."}

    />
  </Flex>
)



class MultiSelect extends Component {

  static propTypes = {
    selections: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string
      })
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string
      })
    ),
    onSearchChange: PropTypes.func,
    onSelectionsChange: PropTypes.func,

    label: PropTypes.string
  }

  state = {
    search: ''
  }

  render(){

    const {
      props: {
        label,
        options,
        selections
      },
      state: {
        search
      },
      handleSearchChange,
      handleUncheck,
      handleCheck
    } = this




    let filteredOptions = options.slice().filter(
      option => !selections.find(
        selection => selection.value === option.value
      )
    )

    filteredOptions = filteredOptions.filter(
      option => {
        let regexp = new RegExp(search, 'gi')
        if (
          option.name.match(regexp)
        ) {
          return true
        }
        return false
      }
    )

    return (
      <Flex
        flexWrap={'wrap'}
        w={1}
      >
        {selections.map( ({name, value}) => (
          <Box
            key={value}
          >
            {name}
            <input
              type={'checkbox'}
              checked={true}
              value={value}
              onChange={handleUncheck}
            />
          </Box>
        ))}






        <Flex
          flexWrap={'wrap'}
        >
          <Box
            w={1}
          >
            <label>
              {label}
            </label>
            <input
              name={'search'}
              value={search}
              onChange={handleSearchChange}
            />
          </Box>
          {filteredOptions.map( ({name, value}) => (
            <Box
              w={1}
              key={value}
              value={value}
            >
              {name}
              <input
                type={'checkbox'}
                checked={false}
                value={value}
                onChange={handleCheck}
              />
            </Box>
          ))}

        </Flex>





      </Flex>
    )
  }

  handleSearchChange = ({target: {value, name}}) => {
    this.setState(
      ()=>({[name]: value}),
      ()=>{
        this.props.onSearchChange(this.state.search)
      }
    )

  }

  handleCheck = (e) => {
    console.log('check', e)
  }

  handleUncheck = (e) => {
    console.log("uncheck", e)
  }

}

export {
  MultiSelect
}
