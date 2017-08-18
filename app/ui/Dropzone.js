import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import apiFile from '../utils/apiFile'
import {Column} from './layout'
import {Button} from './buttons'
import {H4} from './h'

export default class extends Component {

  state = {
    file: {}
  }

  render() {
    const {
      handleDrop,
      save,
      state: {
        file
      }
    } = this
    return (
      <Container>
        <Dropzone
          accept={'image/*'}
          onDropAccepted={handleDrop}
          style={{
            width: '80%',
            height: '300px',
            margin: "5%",
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            border: '2px dashed lightgray',
            boxSizing: 'border-box',
            cursor: "pointer",
            borderRadius: '10px'
          }}
        >
          {(file.preview) ? (
            <Preview
              src={file.preview}
            />
          ) : (
            <H4>Drag Image to Upload</H4>
          )}

        </Dropzone>
        <Button
          onClick={save}
        >
          Upload
        </Button>
      </Container>
    )
  }

  handleDrop = (files) => {
    try {
      console.log(files[0])
      this.setState({file: files[0]})
    } catch (ex) {
      console.error(ex)
    }
  }

  save = async () => {
    try {
      const data = await apiFile(this.state.file, this.props.organization.id)
      console.log(data)
    } catch (ex) {
      console.error(ex)
    }
  }

}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Preview = styled.img`
  width: 100%;
  object-fit: contain;
`
