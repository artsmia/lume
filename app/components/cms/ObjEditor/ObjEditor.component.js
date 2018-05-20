import React, { Component } from 'react'
import styled from 'styled-components'
import { ChangeImage } from '../DefaultEditors'
import { Button } from '../../mia-ui/buttons'
import { CheckboxInput, Label, Input } from '../../mia-ui/forms'
import { Flex, Box } from 'grid-styled'
import { Expander } from '../../mia-ui/expanders'
import ImgSrcProvider from '../../shared/ImgSrcProvider'
import Joyride from 'react-joyride'
import { ImagesQuery } from '../../../apollo/queries/images'

export default class ObjEditor extends Component {
  wait = duration => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, duration)
    })
  }

  write = async (text, name) => {
    try {
      for (let i = 0; i <= text.length; i++) {
        await this.wait(15)
        this.handleChange({
          target: {
            name,
            value: text.slice(0, i)
          }
        })
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  initialState = {
    id: '',
    title: '',
    description: '',
    attribution: '',
    date: '',
    accessionNumber: '',
    medium: '',
    dimensions: '',
    currentLocation: '',
    creditLine: '',
    pullFromCustomApi: false,
    localId: '',
    exp: true
  }

  state = {
    ...this.initialState,
    demoIndex: 0,
    demoSteps: [
      {
        target: '#obj-editor',
        content: (
          <div>
            <p>
              Now that we've created an object, we can edit it and associate it
              with an image.
            </p>
            <Button
              onClick={() => {
                this.props.onDemoFinish()
              }}
            >
              Next
            </Button>
          </div>
        ),
        disableBeacon: true
      }
    ]
  }

  handleDemoChange = async ({ action, index, lifecycle, step }) => {
    try {
      if (
        action === 'update' &&
        index === 0 &&
        lifecycle === 'tooltip' &&
        !this.state.description
      ) {
        await this.write("Curator's Office", 'title')

        await this.write('Mark Dion', 'attribution')

        await this.write(
          'G378, Minneapolis Institute of Art',
          'currentLocation'
        )

        await this.write('2012-2013', 'date')

        let {
          data: { images }
        } = await this.props.client.query({
          query: ImagesQuery,
          variables: {
            filter: {
              organization: {
                subdomain: this.props.router.query.subdomain
              },
              search: "Curator's Office"
            }
          }
        })

        await this.handleImageChange({
          target: { name: 'primaryImadeId', value: images[0].id }
        })
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    if (!this.props.obj || !this.props.organization) return null

    const {
      state,
      handleChange,
      handleSave,
      handleCheck,
      props: { organization, obj },
      state: { exp }
    } = this

    let disabled = this.props.organization.customObjApiEnabled

    return (
      <Expander
        open={exp}
        onRequestOpen={() => this.setState({ exp: true })}
        onRequestClose={() => this.setState({ exp: false })}
        id={'obj-editor'}
      >
        <Flex flexWrap={'wrap'} w={1}>
          {this.props.organization.customObjApiEnabled ? (
            <Flex w={1}>
              <Label>Pulling From Custom API</Label>
              <CheckboxInput
                name={'pullFromCustomApi'}
                checked={state.pullFromCustomApi}
                onChange={handleCheck}
                disabled
              />
            </Flex>
          ) : null}
          {this.props.organization.customObjApiEnabled ? (
            <Box w={1}>
              <Label>Local ID</Label>
              <Input
                placeholder={'Local ID'}
                name={'localId'}
                value={state.localId}
                onChange={handleChange}
                disabled={disabled}
              />
            </Box>
          ) : null}

          <Box w={1}>
            <Label>Title</Label>
            <Input
              placeholder={'Title'}
              name={'title'}
              value={state.title}
              onChange={handleChange}
              disabled={disabled}
            />
          </Box>
          <Box w={1}>
            <Label>Attribution</Label>
            <Input
              placeholder={'Attribution'}
              name={'attribution'}
              value={state.attribution}
              onChange={handleChange}
              disabled={disabled}
            />
          </Box>
          <Box w={1}>
            <Label>Current Location</Label>
            <Input
              placeholder={'Current Location'}
              name={'currentLocation'}
              value={state.currentLocation}
              onChange={handleChange}
              disabled={disabled}
            />
          </Box>
          <Box w={1}>
            <Label>Date</Label>
            <Input
              placeholder={'Date'}
              name={'date'}
              value={state.date}
              onChange={handleChange}
              disabled={disabled}
            />
          </Box>
          <Box w={1}>
            <ChangeImage
              label={'Image'}
              name={'primaryImageId'}
              image={obj.primaryImage}
              onChange={this.handleImageChange}
            />
          </Box>
        </Flex>
        <Joyride
          run={this.props.showDemo} //this.props.router.query.demo ?  true : false}
          steps={this.state.demoSteps}
          stepIndex={this.state.demoIndex}
          styles={{
            buttonClose: {
              display: 'none'
            },
            buttonNext: {
              display: 'none'
            },
            buttonBack: {
              display: 'none'
            }
          }}
          disableOverlayClose={true}
          disableCloseOnEscape={true}
          callback={this.handleDemoChange}
        />
      </Expander>
    )
  }

  handleImageChange = ({ target: { value, name } }) => {
    this.props.editObj({
      id: this.props.objId,
      primaryImageId: value
    })
  }

  bounce = true

  debounce = (func, wait) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(func, wait)
    }
  }

  handleChange = ({ target: { value, name, checked } }) => {
    this.setState(
      () => ({ [name]: value }),
      () => {
        this.debounce(this.handleSave, 1000)
      }
    )
  }

  handleCheck = ({ target: { name, checked } }) => {
    this.setState(
      () => ({ [name]: checked }),
      () => {
        this.debounce(this.handleSave, 1000)
      }
    )
  }

  handleSave = () => {
    this.props.editObj({
      title: this.state.title,
      attribution: this.state.attribution,
      currentLocation: this.state.currentLocation,
      date: this.state.date
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.obj) {
      if (nextProps.obj.id !== this.state.id) {
        let { obj } = nextProps
        let state = {}
        Object.keys(obj).forEach(key => {
          Object.assign(state, {
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
