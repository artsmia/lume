import React, {Component} from 'react'
import styled from 'styled-components'
import {Label, Input, Checkbox} from '../../ui/forms'
import {Row} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import Cookie from 'js-cookie'
import {apiUrl} from '../../config'

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
        <Row>
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
        </Row>
        <Button
          onClick={handleUpload}
          disabled={(
            !hasRights ||
            !alt ||
            !title ||
            files.length < 1 ||
            uploading
          )}
        >
          Upload to Google Drive
        </Button>
      </Container>
    )
  }


  handleFile = ({target: {name, files}}) => {
    this.setState({[name]: files})
  }

  handleCheckbox = ({target: {name, checked}}) => this.setState({[name]: checked})

  handleUpload = async () => {
    try {

      const {
        state: {
          files: [
            file
          ],
          title,
          alt
        },
        props: {
          orgId
        }
      } = this

      let form = new FormData()

      form.append("file", file)
      form.append("userId", Cookie.get("userId"))
      form.append("title", title)
      form.append("alt", alt)
      form.append("orgId", orgId)

      const url  = `${apiUrl}/gdrive`

      let options = {
        method: 'POST',
        body: form
      }

      const response = await fetch(url, options)

      console.log(await response.json())

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
