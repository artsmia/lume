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
import {Icon} from '../../mia-ui/icons'

export default class MediaManager extends Component {

  state = {
    selectedTab: 'select',
    search: '',
    preview: '',
    title: "",
    description: "",
    hasRights: false,
    selectedMediaId: ''
  }

  render(){

    const {
      state: {
        selectedTab,
        search,
        preview,
        title,
        description,
        hasRights,
        files,
        selectedMediaId
      },
      handleFile,
      handleUpload,
      handleChange,
      handleCheckbox,
      handleSearchChange,
      handleMediaSave,
      handleLoadMore,
      props: {
        medias
      }
    } = this

    let selectedMedia = selectedMediaId ? medias.find(media => media.id === selectedMediaId) : null

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
            <SelectFlex
              p={1}
            >
                <OrgMediasFlex
                  width={1/2}
                  flexDirection={'column'}
                  p={2}
                >
                  <Box
                    width={1}
                    mb={2}
                  >
                    <Search
                      value={search}
                      name={"search"}
                      onChange={handleSearchChange}
                    />


                  </Box>

                  {medias ? (
                    <MediaList
                      w={1}
                      flexWrap={'wrap'}
                      p={1}
                    >
                      {medias.map(media => (
                        <MediaBox
                          key={media.id}
                          width={[1/3]}
                          p={2}
                          onClick={()=>this.setState({selectedMediaId: media.id})}
                          selected={(selectedMediaId === media.id)}
                        >
                          {this.renderMediaIcon(media)}

                        </MediaBox>
                      ))}
                      <Box
                        width={1}
                      >
                        {(medias.length < 1) ? (
                          <p>You don't have any images yet</p>
                        ):null}
                        {(medias.length % 10 === 0) ? (
                          <Button
                            onClick={handleLoadMore}
                            color={'white'}
                          >
                            Load More
                          </Button>
                        ): null}
                      </Box>
                    </MediaList>
                  ): null}





            </OrgMediasFlex>




              <Flex
                width={1/2}
                p={2}
              >
                {(selectedMedia) ? (
                  <ReactPlayer
                    url={`${process.env.S3_URL}/mia-lume/${selectedMedia.id}/original.${selectedMedia.format}`}
                    controls
                  />
                ): (
                  <H3>
                    Choose a media from the left
                  </H3>
                )}
              </Flex>
            </SelectFlex>




            <Button
              onClick={handleMediaSave}
            >
              Select
            </Button>
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
                    files.length < 1
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

  handleMediaSave = () => {
    this.props.onMediaSave(this.state.selectedMediaId)
  }

  renderMediaIcon = (selectedMedia) => {
    if(selectedMedia.format === 'mp4') {
      return (
        <Icon
          icon={"local_movies"}
          size={'70px'}
        />
      )
    } else {
      return (
        <Icon
          icon={"volume_up"}
          size={'70px'}
        />
      )
    }

  }

  bounce = true

  debounce = (func, wait) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(
        func,
        wait
      )
    }
  }

  handleSearchChange = ({target: {value, name}}) => {
    this.setState(
      ()=>({[name]:value}),
      ()=>{
        this.debounce(this.handleSearch, 2000)
      }
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
            router: {
              query: {
                subdomain
              }
            }
          }
        } = this

        let form = new FormData()

        form.append("file", file)
        form.append("userId", localStorage.getItem('userId'))
        form.append("title", title)
        form.append("description", description)
        form.append("subdomain", subdomain)

        const url  = (process.env.FILE_STORAGE === 's3') ? `${process.env.API_URL}/media` : 'http://localhost:3001/upload'

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

    handleSearch = () => {
      this.props.refetch({
        filter: {
          ...this.props.variables.filter,
          search: this.state.search
        }
      })
    }

}

const Container = styled(Flex)`
  width: 80vw;
  height: 80vh;
`

const MediaList = styled(Flex)`
  overflow-y: scroll;
  border: 1px solid ${({theme}) => theme.color.gray30};
  height: 100%;
`

const MediaBox = styled.div`
  height: 150px;
  border: 1px solid grey;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({selected, theme}) => selected ? `
    box-shadow: 0 0 10px 3px ${theme.color.green};
  ` : ''}
`

const OrgMediasFlex = styled(Flex)`
  height: 100%;
`
const SelectFlex = styled(Flex)`
  height: 100%;
`
