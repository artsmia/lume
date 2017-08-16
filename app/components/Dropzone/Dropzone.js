import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import apiFile from '../../utils/apiFile'
import {Column} from '../../ui/layout'
import {Button} from '../../ui/buttons'

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
      <Column>
        <Dropzone
          accept={'image/*'}
          onDropAccepted={handleDrop}
          style={{
            width: "400px",
            height: "600px",
            border: "2px dashed grey",
            display: "flex",
            alignItems: "center"
          }}
        >
          <Preview
            src={file.preview}
          />
        </Dropzone>
        <Button
          onClick={save}
        >
          Save
        </Button>
      </Column>
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
      const data = await apiFile(this.state.file, this.props.orgId)
      console.log(data)
    } catch (ex) {
      console.error(ex)
    }
  }

}

const Preview = styled.img`
  width: 100%;
`
