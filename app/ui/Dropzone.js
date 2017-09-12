import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import {Column} from './layout'
import {Button} from './buttons'
import {H4} from './h'
import {Loading} from './spinner'


export default class extends Component {

  state = {
    file: {},
    uploading: false
  }

  render() {
    const {
      handleDrop,
      props: {
        onImageUpload,
        uploading
      },
      state: {
        file,
      }
    } = this
    return (
      <Container>
        {(uploading) ? <Loading/> : null }
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
          onClick={() => {onImageUpload(file)}}
          disabled={(uploading)}
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
  height: 100%;
  object-fit: contain;
`
