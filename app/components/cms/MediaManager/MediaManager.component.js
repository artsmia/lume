import React from 'react'
import {Component} from 'react'
import {TabContainer, TabHeader, Tab, TabBody} from '../../mia-ui/tabs'
import {Button} from '../../mia-ui/buttons'
import {Search, CheckboxInput, Label, Input, Textarea} from '../../mia-ui/forms'
// import MediaUploader from './MediaUploader'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {GridList, Tile} from '../../mia-ui/lists'
import {Flex, Box} from 'grid-styled'
import {H3} from '../../mia-ui/text'
import imgSrcProvider from '../../shared/ImgSrcProvider'
import fetch from 'isomorphic-unfetch'
import ReactPlayer from 'react-player'

export default class MediaManager extends Component {

  state = {
    selectedTab: 'select',
    search: '',
    preview: '',
    title: "",
    description: "",
    hasRights: false
  }

  render(){

    const {
      state: {
        selectedTab,
        search,
        preview,
        title,
        description,
        hasRights
      },
      handleFile,
      handleUpload,
      handleChange,
      handleCheckbox
    } = this

    return (
      <Container>
        <TabContainer
          selectedTab={selectedTab}
        >
          <TabHeader>
            <Tab
              name={"select"}
              onClick={()=>this.setState({selectedTab: "select"})}
            >
              Select
            </Tab>
            <Tab
              name={"add"}
              onClick={()=>this.setState({selectedTab: "add"})}
            >
              Add
            </Tab>
          </TabHeader>
          <TabBody
            name={'select'}
          >

          </TabBody>
          <TabBody
            name={'add'}
          >
            <Flex>
              <Flex
                w={1/3}
                flexWrap={'wrap'}
              >
                <Box
                  w={1}
                >
                  <input
                    type={"file"}
                    name={"files"}
                    onChange={handleFile}
                  />
                </Box>
                <Box
                  w={1}
                >
                  <Label>
                    Title
                  </Label>
                  <Input
                    name={"title"}
                    value={title}
                    onChange={handleChange}
                  />
                </Box>
                <Box
                  w={1}
                >
                  <Label>
                    Description
                  </Label>
                  <Textarea
                    name={"description"}
                    value={description}
                    onChange={handleChange}
                  />
                </Box>
                <Box
                  w={1}
                >
                  <Label>
                    I have the right to distribute this image.
                  </Label>
                  <CheckboxInput
                    value={"hasRights"}
                    checked={hasRights}
                    onChange={handleCheckbox}
                  />
                </Box>

                <Button
                  onClick={handleUpload}
                  disabled={(
                    !hasRights ||
                    !description ||
                    !title ||
                    files.length < 1 ||
                    uploading
                  )}
                >
                  Upload
                </Button>
              </Flex>
              <Flex
                w={2/3}
              >
                {preview ? (
                  <ReactPlayer
                    url={preview}
                    controls={true}
                  />
                ):null}

              </Flex>
            </Flex>
          </TabBody>
        </TabContainer>
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


    handleCheckbox = ({target: {value, checked}}) => this.setState({[value]: checked})

    handleUpload = async () => {
      try {

        const {
          state: {
            files: [
              file
            ],
            title,
            description
          },
          props: {
            subdomain
          }
        } = this

        let form = new FormData()

        form.append("file", file)
        form.append("userId", localStorage.getItem('userId'))
        form.append("title", title)
        form.append("description", description)
        form.append("subdomain", subdomain)

        const url  = (process.env.FILE_STORAGE === 's3') ? `${process.env.API_URL}/image` : 'http://localhost:3001/upload'

        let options = {
          method: 'POST',
          body: form
        }

        const response = await fetch(url, options)

        await response.json()

        this.setState({
          uploading: false,
          files: [],
          hasRights: false,
          description: "",
          title: "",
          preview: "",
        })




      } catch (ex) {
        console.error(ex)
      }
    }

    handleChange = ({target: {value, name}}) => this.setState({[name]: value})
}

const Container = styled(Flex)`
  width: 80vw;
  height: 80vh;
`
