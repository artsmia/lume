import React, {Component} from 'react'
import styled from 'styled-components'
import {ChangeImage} from '../DefaultEditors'
import {Button} from '../../mia-ui/buttons'
import {CheckboxInput, Label, Input} from '../../mia-ui/forms'
import {Flex, Box} from 'grid-styled'
import {Expander} from '../../mia-ui/expanders'
import getImageSrc from '../../../utils/getImageSrc'

export default class ObjEditor extends Component {

  initialState = {
    id: "",
    title: "",
    description: "",
    attribution: "",
    date: "",
    accessionNumber: "",
    medium: "",
    dimensions: "",
    currentLocation: "",
    creditLine: "",
    pullFromCustomApi: false,
    primaryImageId: undefined,
    localId: "",
    exp: true
  }

  state = {
    ...this.initialState
  }


  render(){

    if (!this.props.obj) return null

    const {
      state,
      handleChange,
      handleSave,
      handleCheck,
      props: {
        organization,
        obj
      },
      state: {
        exp
      }
    } = this

    let disabled = (state.pullFromCustomApi)

    return (
      <Expander
        open={exp}
        onRequestOpen={() => this.setState({exp: true})}
        onRequestClose={() => this.setState({exp: false})}

      >
        <Flex
          flexWrap={'wrap'}
          w={1}
        >
          <Flex
            w={1}
          >
            <Label>
              Pull From Custom API
            </Label>
            <CheckboxInput
              name={"pullFromCustomApi"}
              checked={state.pullFromCustomApi}
              onChange={handleCheck}
            />
          </Flex>
          <Box
            w={1}
          >
            <Label>
              Local ID
            </Label>
            <Input
              placeholder={"Local ID"}
              name={"localId"}
              value={state.localId}
              onChange={handleChange}
              disabled={disabled}
            />
          </Box>
          <Box
            w={1}
          >
            <Label>
              Title
            </Label>
            <Input
              placeholder={"Title"}
              name={"title"}
              value={state.title}
              onChange={handleChange}
              disabled={disabled}

            />
          </Box>
          <Box
            w={1}
          >
            <Label>
              Attribution
            </Label>
            <Input
              placeholder={"Attribution"}
              name={"attribution"}
              value={state.attribution}
              onChange={handleChange}
              disabled={disabled}

            />
          </Box>
          <Box
            w={1}
          >
            <Label>
              Date
            </Label>
            <Input
              placeholder={"Date"}
              name={"date"}
              value={state.date}
              onChange={handleChange}
              disabled={disabled}

            />
          </Box>
          <Box
            w={1}
          >
            <ChangeImage
              label={"Image"}
              name={'primaryImageId'}
              src={
                getImageSrc({
                  organization,
                  image: obj.primaryImage,
                  quality: 'm'
                })
              }
              onChange={handleChange}
            />
          </Box>
          <Box
            w={1}
          >
            <Button
              onClick={handleSave}
            >
              Save Obj
            </Button>
          </Box>


        </Flex>
      </Expander>

    )
  }


  handleChange = ({target: {value, name, checked}}) => {
    this.setState({[name]: value})
  }

  handleCheck = ({target: {name, checked}}) => {
    this.setState({[name]: checked})
  }

  handleSave = () => {
    this.props.editObj({
      ...this.state,
      __typename: undefined,
      exp: undefined
    })
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.obj){
      if (nextProps.obj.id !== this.state.id) {
        let {obj} = nextProps
        let state = {}
        Object.keys(obj).forEach( key => {
          Object.assign(state,{
            [key]: obj[key] || this.initialState[key]
          })
        })
        this.setState(state)
      }
    }
  }

}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  border: 1px solid grey;
  min-height: 500px;
`
