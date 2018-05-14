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


const InputEl = styled.input`
  outline: none;
  padding: .65em;
  border-radius: 2px;
  box-shadow: inset 0 0px 0px ${transparent};
  border: solid 1px ${gray30};
  color: inherit;
  font-size: 1rem;
  width: 100%;
  &:placeholder {
    color: ${gray30};
  }

  &:disabled {
    background-color: ${gray30};
  }

  ${({valid}) => valid ? css`
    border: 2px solid ${({theme})=> theme.color.green};
  ` : null}


  ${({invalid}) => invalid ? css`
    border: 2px solid ${({theme})=> theme.color.red};
  ` : null}
  ${({paddingLeft}) => paddingLeft ? css`
    padding-left: ${paddingLeft};
  `:null}
`


InputEl.displayName = "InputEl"


const ErrorSpan = styled.span`
  color: ${red};
  ${bold}
`

export const Input = (props) => (
  <Flex
    w={1}
  >
    <InputEl
      {...props}
    />
    <ErrorSpan>{props.errorMsg}</ErrorSpan>
  </Flex>
)

export const Textarea = InputEl.withComponent('textarea').extend`
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
// TextareaInput.propTypes = {
//   label: PropTypes.string,
//   minHeight: PropTypes.string,
//   width: PropTypes.string,
//
// }
// TextareaInput.defaultProps = {
//   label: '',
//   minHeight: '',
//   width: '',
// }

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
  font-size: 1.5rem;
  ${bold};
  &:placeholder {
    color: ${gray60};
  }
  height: 50px
  width: 100%;
  background-color: white;
  border: 1px solid ${gray30};
  border-radius: 4px;
`

const TitleLabel = styled.label`
  display: none;
`

export const Title = (props) => (
  <Flex
    mb={3}
    flexDirection={'column'}
  >
    <TitleLabel
      name={props.name}
    >
      {props.label}
    </TitleLabel>
    <TitleInput
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={"Add a title here."}
      {...props}
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

export const Description = (props) => (
  <Flex
    mb={3}
    flexDirection={'column'}
  >
    <DescriptionLabel
      name={props.name}
    >
      {props.label}
    </DescriptionLabel>
    <DescriptionTextarea
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={"Enter a description here."}
      {...props}
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
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    label: PropTypes.string
  }

  state = {
    search: '',
    showDrop: false
  }

  render(){

    const {
      props: {
        label,
        options,
        selections
      },
      state: {
        search,
        showDrop
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
        alignItems={'flex-start'}
        my={2}
      >
        <ChipContainer
          flexWrap={'wrap'}
        >
          {selections.map( ({name, value}) => (
            <Chip
              key={value}
              alignItems={'center'}
              justifyContent={'flex-start'}
              m={1}
            >
              <ChipText
                mx={2}
              >
                {name}
              </ChipText>
              <XBox
                justifyContent={'center'}
                alignItems={'center'}
                onClick={()=>handleUncheck(value)}
                mx={2}
              >
                x
              </XBox>

            </Chip>
          ))}
          <SearchAndDrop
            mx={2}
          >
            <MultiSearch
              name={'search'}
              value={search}
              onChange={handleSearchChange}
              placeholder={'Search'}
              onFocus={()=>this.setState({showDrop: true})}
              onBlur={()=>{
                setTimeout(
                  () => {this.setState({showDrop: false})},
                  200
                )
            }}
            />
            <DropDown
              show={showDrop}
            >
              {filteredOptions.map( ({name, value}) => (
                <DropBox
                  w={1}
                  key={value}
                  onClick={()=>handleCheck(value)}
                  px={2}
                  py={1}
                >
                  {name}

                </DropBox>
              ))}

            </DropDown>
          </SearchAndDrop>
        </ChipContainer>

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

  handleCheck = (value) => {
    this.props.onAdd(value)
  }

  handleUncheck = (value) => {
    this.props.onRemove(value)
  }

}

const Chip = styled(Flex)`
  border-radius: 15px;
  border: 2px solid ${({theme}) => theme.color.green};
  padding: 5px;
  height: 35px;
  color: ${({theme}) => theme.color.black};
  background-color: ${({theme}) => theme.color.white};
  font-size: 15px;
  &:focus {
    background-color: red;
  }
`

const ChipContainer = styled(Flex)`

`

const ChipText = styled.span`
  white-space: nowrap;
`

const SearchAndDrop = styled(Flex)`

  position: relative;

`

const MultiSearch = styled.input`
  border: 1px solid black;
  border-radius: 2px;
  outline: none;
  height: 35px;
  padding: 5px;
  width: 220px;
  font-style: 15px;
`

const DropDown = styled.div`
  flex-wrap: wrap;
  display: none;
  width: 220px;
  opacity: 0;
  position: absolute;
  bottom: 0;
  transform: translateY(98%);
  transition: all .2s;
  background-color: white;
  border: 1px solid grey;
  z-index: 500;
  max-height: 400px;
  overflow-y: scroll;
  ${({show}) => show ? `
    opacity: 1;
    display: flex;

  `: undefined}
`


const XBox = styled(Flex)`
  color: black;
  font-family: ${({theme}) => theme.font.bold};
  cursor: pointer;
`

const DropBox = styled(Flex)`
  &:hover {
    background-color: ${({theme}) => theme.color.gray30};
  }
`

export {
  MultiSelect
}
