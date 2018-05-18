import React, { Component } from 'react'
import styled from 'styled-components'
import { Label, Input, CheckboxInput, Textarea } from '../../mia-ui/forms'
// import {Row, Column} from '../../mia-ui/layout'
import { Button } from '../../mia-ui/buttons'
// import Snackbar from '../../mia-ui/Snackbar'
import { Spinner, Loading, Waiting } from '../../mia-ui/loading'
import { Flex, Box } from 'grid-styled'
import Joyride from 'react-joyride'

export default class extends Component {
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
        await this.wait(50)
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

  demoSteps = [
    {
      target: '#upload-images-container',
      content: (
        <div>
          <p>
            The image manager allows you to select from your existing images or
            to upload new images.
          </p>
          <Button
            onClick={() => {
              this.setState(({ demoIndex }) => ({ demoIndex: demoIndex + 1 }))
            }}
          >
            Next
          </Button>
        </div>
      ),
      disableBeacon: true
    },
    {
      target: '#upload-images-container',
      content: (
        <div>
          <p>
            Because Lume is a free to use and open source program, we ask that
            all of our users ensure that they have the right to share any images
            they use on Lume.
          </p>
          <p>
            You should also make sure to include a title and description of your
            image when you upload it. This will make it easier to search for
            later and will allow users with screen readers to better understand
            your story.
          </p>

          <Button
            onClick={async () => {
              await this.handleUpload()
              this.props.onDemoFinish()
            }}
          >
            Upload Image
          </Button>
        </div>
      ),
      disableBeacon: true
    }
  ]

  handleDemoChange = async ({ action, index, lifecycle, step }) => {
    try {
      if (action === 'update' && index === 0 && lifecycle === 'tooltip') {
        let response = await fetch(`/static/frankenstein.jpg`)

        let arrayBuffer = await response.arrayBuffer()

        let files = [
          new File([arrayBuffer], 'Frankenstein.jpg', {
            type: 'image/jpeg'
          })
        ]

        this.handleFile({ target: { name: 'files', files } })
      }
      if (action === 'update' && index === 1 && lifecycle === 'tooltip') {
        await this.write("Frankenstein's Monster, Actor", 'title')
        await this.write(
          "A black and white photo of Boris Karloff, as Frankenstein's monster, using Jack Pierce's makeup design.",
          'description'
        )
        this.setState({ hasRights: true })
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  componentWillReceiveProps(nextProps) {
    try {
      if (nextProps.showDemo) {
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  state = {
    files: [],
    uploading: false,
    hasRights: false,
    description: '',
    title: '',
    snackMessage: '',
    snackId: Math.random(),
    demoSteps: this.demoSteps,
    demoIndex: 0
  }

  render() {
    const {
      handleFile,
      handleUpload,
      handleChange,
      handleCheckbox,
      state: {
        files,
        hasRights,
        description,
        title,
        uploading,
        snackId,
        snackMessage,
        preview
      }
    } = this

    return (
      <Flex my={2} id={'upload-images-container'}>
        {uploading ? <Waiting /> : null}
        <Flex w={1 / 2} flexWrap={'wrap'} flexDirection={'column'} pr={2}>
          <Box w={1}>
            <Label>Image</Label>
            <input
              type={'file'}
              name={'files'}
              accept={'image/*'}
              onChange={handleFile}
            />
          </Box>
          <Box w={1}>
            <Label>Title</Label>
            <Input name={'title'} value={title} onChange={handleChange} />
          </Box>
          <Box w={1}>
            <Label>Description</Label>
            <Textarea
              name={'description'}
              value={description}
              onChange={handleChange}
            />
          </Box>
          <Box w={1}>
            <Label>I have the right to distribute this image.</Label>
            <CheckboxInput
              value={'hasRights'}
              checked={hasRights}
              onChange={handleCheckbox}
            />
          </Box>

          <Button
            onClick={handleUpload}
            disabled={
              !hasRights ||
              !description ||
              !title ||
              files.length < 1 ||
              uploading
            }
          >
            Upload
          </Button>
        </Flex>
        <Box>
          {uploading ? <Spinner /> : null}
          {preview && !uploading ? (
            <Preview src={preview} alt={`Preview of ${description}`} />
          ) : null}
        </Box>
        <Joyride
          run={this.props.showDemo ? true : false}
          steps={this.state.demoSteps}
          stepIndex={this.state.demoIndex}
          callback={this.handleDemoChange}
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
        />
      </Flex>
    )
  }

  handleFile = ({ target: { name, files } }) => {
    this.setState({ [name]: files })

    if (files[0]) {
      const reader = new FileReader()
      reader.onload = e => {
        this.setState({ preview: e.target.result })
      }

      reader.readAsDataURL(files[0])
    }
  }

  handleCheckbox = ({ target: { value, checked } }) =>
    this.setState({ [value]: checked })

  handleUpload = async () => {
    try {
      const {
        state: {
          files: [file],
          title,
          description
        },
        props: { subdomain }
      } = this

      let form = new FormData()

      form.append('file', file)
      form.append('userId', localStorage.getItem('userId'))
      form.append('title', title)
      form.append('description', description)
      form.append('subdomain', subdomain)

      const url =
        process.env.FILE_STORAGE === 'local'
          ? 'http://localhost:3001/upload'
          : `${process.env.API_URL}/image`

      let options = {
        method: 'POST',
        body: form
      }

      this.setState({
        uploading: true
      })

      const response = await fetch(url, options)

      await response.json()

      this.setState({
        uploading: false,
        files: [],
        hasRights: false,
        description: '',
        title: '',
        preview: ''
      })

      await this.props.refetch()
    } catch (ex) {
      console.error(ex)
    }
  }

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value })
}

const Preview = styled.img`
  height: 300px;
  object-fit: contain;
`

const Message = styled.p`
  font-family: ${({ theme }) => theme.font.regular};
`
