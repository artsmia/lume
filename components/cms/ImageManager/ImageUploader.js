import React, {Component} from 'react'
import styled from 'styled-components'
import {Label, Input, Checkbox, Textarea} from '../../ui/forms'
import {Row, Column} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import Cookie from 'js-cookie'
import {apiUrl} from '../../../config'
import Snackbar from '../../ui/Snackbar'
import {Spinner} from '../../ui/spinner'

export default class extends Component {

  state = {
    files: [],
    uploading: false,
    hasRights: false,
    alt: "",
    title: "",
    snackMessage: "",
    snackId: Math.random(),
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
        alt,
        title,
        uploading,
        snackId,
        snackMessage,
        preview,
      }
    } = this


    return (
      <Container>
        {(uploading) ? (
          <Spinner/>
        ): null}
        <Snackbar
          message={snackMessage}
          snackId={snackId}
        />
        <Row>
          <Column>

            <Label>
              Image
            </Label>
            <input
              type={"file"}
              name={"files"}
              accept={"image/*"}
              onChange={handleFile}
            />
              <Label>
                Title
              </Label>
              <Input
                name={"title"}
                value={title}
                onChange={handleChange}
              />
              <Label>
                Description
              </Label>
              <Textarea
                name={"alt"}
                value={alt}
                onChange={handleChange}
              />
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
              Upload
            </Button>
          </Column>
          <Column>
            {(preview) ? (
              <Preview
                src={preview}
                alt={`Preview of ${alt}`}
              />
            ): null}
          </Column>
        </Row>
      </Container>
    )
  }


  handleFile = ({target: {name, files}}) => {
    this.setState({[name]: files})

    if (files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.setState({preview: e.target.result})
      }

      reader.readAsDataURL(files[0])
    }

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
          subdomain
        }
      } = this

      let form = new FormData()

      form.append("file", file)
      form.append("userId", Cookie.get("userId"))
      form.append("title", title)
      form.append("alt", alt)
      form.append("subdomain", subdomain)

      const url  = `${apiUrl}/image`

      let options = {
        method: 'POST',
        body: form
      }

      this.setState({
        uploading: true,
        snackMessage: "Upload Started...",
        snackId: Math.random(),
      })

      const response = await fetch(url, options)

      await response.json()

      this.setState({
        uploading: false,
        files: [],
        hasRights: false,
        alt: "",
        title: "",
        snackMessage: "Upload Finished",
        snackId: Math.random(),
        preview: "",
      })


      this.props.refetch()



    } catch (ex) {
      console.error(ex)
    }
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

}

const Preview = styled.img`
  height: 300px;
  object-fit: contain;
`

const Message = styled.p`
  font-family: ${({theme}) => theme.fonts.regular};
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  position: relative;
  box-sizing: border-box;
`
