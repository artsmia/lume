import React, {Component} from 'react'
import styled from 'styled-components'
import {Label, Input, Checkbox} from '../../ui/forms'
import {Row} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import {apiUrl} from '../../config'
import Cookie from 'js-cookie'
import {googleApiKey, googleClientId} from '../../config'

export default class extends Component {

  state = {
    files: [],
    uploading: false,
    hasRights: false,
    alt: "",
    title: ""
  }

  render() {
    const {
      handleFile,
      handleUpload,
      handleChange,
      handleCheckbox,
      props: {
        onImageUpload,
        uploading
      },
      state: {
        files,
        hasRights,
        alt,
        title
      }
    } = this
    return (
      <Container>
        <Label>
          Choose An Image
        </Label>
        <input
          type={"file"}
          name={"files"}
          accept={"image/*"}
          onChange={handleFile}
        />
        {/* <Row>
          <Label>
            Title
          </Label>
          <Input
            name={"title"}
            value={title}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <Label>
            Description
          </Label>
          <Input
            name={"alt"}
            value={alt}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <Label>
            I have the right to distribute this image.
          </Label>
          <Checkbox
            name={"hasRights"}
            checked={hasRights}
            onChange={handleCheckbox}
          />
        </Row> */}
        {(this.state.newImage) ? (
          <img
            src={this.state.newImage}
          />
        ) : null}
        <Button
          onClick={handleUpload}
        >
          Upload
        </Button>
      </Container>
    )
  }

  // componentDidMount(){
  //   this.searchFiles()
  // }

  // searchFiles = async() => {
  //   try {
  //
  //     let parentId = '0BxPL1nKsK1AVS3lTUkZUdjNfME0'
  //
  //     let url = `https://www.googleapis.com/drive/v3/files/?key=${googleApiKey}&q='${parentId}' in parents&fields=files(id,name,webContentLink)`
  //     let options = {
  //       method: 'GET'
  //     }
  //
  //     const response = await fetch(url, options)
  //
  //     const json = await response.json()
  //
  //     console.log(json)
  //
  //   } catch (ex) {
  //     console.error(ex)
  //   }
  // }


  handleFile = ({target: {name, files}}) => {
    this.setState({[name]: files})
  }

  handleCheckbox = ({target: {name, checked}}) => this.setState({[name]: checked})

  handleUpload = async () => {
    try {



      let form = new FormData()
      form.append('file', this.state.files[0])
      form.append('userId', Cookie.get("userId"))



      const url  = `${apiUrl}/gdrive`

      let options = {
        method: 'POST',
        body: form
      }

      const response = await fetch(url, options)

      const {webContentLink} = await response.json()

      this.setState({newImage: webContentLink})

    } catch (ex) {
      console.error(ex)
    }
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
