import React, { Component } from "react"
import styled from "styled-components"
import { Label, Input, CheckboxInput, Textarea } from "../../mia-ui/forms"
// import {Row, Column} from '../../mia-ui/layout'
import { Button } from "../../mia-ui/buttons"
// import Snackbar from '../../mia-ui/Snackbar'
import { Spinner, Loading, Waiting } from "../../mia-ui/loading"
import { Flex, Box } from "grid-styled"

export default class extends Component {
  state = {
    files: [],
    uploading: false,
    hasRights: false,
    description: "",
    title: "",
    snackMessage: "",
    snackId: Math.random()
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
      <Flex my={2}>
        {uploading ? <Waiting /> : null}
        <Flex w={1 / 2} flexWrap={"wrap"} flexDirection={"column"} pr={2}>
          <Box w={1}>
            <Label>Image</Label>
            <input
              type={"file"}
              name={"files"}
              accept={"image/*"}
              onChange={handleFile}
            />
          </Box>
          <Box w={1}>
            <Label>Title</Label>
            <Input name={"title"} value={title} onChange={handleChange} />
          </Box>
          <Box w={1}>
            <Label>Description</Label>
            <Textarea
              name={"description"}
              value={description}
              onChange={handleChange}
            />
          </Box>
          <Box w={1}>
            <Label>I have the right to distribute this image.</Label>
            <CheckboxInput
              value={"hasRights"}
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

      form.append("file", file)
      form.append("userId", localStorage.getItem("userId"))
      form.append("title", title)
      form.append("description", description)
      form.append("subdomain", subdomain)

      const url =
        process.env.FILE_STORAGE === "local"
          ? "http://localhost:3001/upload"
          : `${process.env.API_URL}/image`

      let options = {
        method: "POST",
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
        description: "",
        title: "",
        preview: ""
      })

      this.props.refetch()
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
