import React from 'react'
import { Component } from 'react'
import { TabContainer, TabHeader, Tab, TabBody } from '../../mia-ui/tabs'
import { Button } from '../../mia-ui/buttons'
import { Search, Input, Textarea } from '../../mia-ui/forms'
import ImageUploader from './ImageUploader'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Zoomer from '../../shared/Zoomer'
import { GridList, Tile } from '../../mia-ui/lists'
import { Flex, Box } from 'grid-styled'
import { H3 } from '../../mia-ui/text'
import { Loading, Waiting } from '../../mia-ui/loading'

import imgSrcProvider from '../../shared/ImgSrcProvider'
import fetch from 'isomorphic-unfetch'
import { ImagesQuery } from '../../../apollo/queries/images'
import Joyride from 'react-joyride'

const ImageEl = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  ${({ selected, theme }) =>
    selected
      ? `
    box-shadow: 0 0 10px 3px ${theme.color.green};
  `
      : ''};
`
const Image = imgSrcProvider(ImageEl)

export default class ImageManager extends Component {
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
      target: '#select-images-container',
      content: (
        <div>
          <p>
            When your images are done uploading to Lume, they will appear here
            amongst your other images.
          </p>
          <p>
            Don't worry if your image doesn't appear immediately, it can take
            several minutes for images to appear depending on your internet
            speed. Lume allows for large images and it sometimes take a few
            moments for our servers to break those images up into tiles.
          </p>
          <Button
            onClick={() => {
              this.setState(({ demoIndex }) => ({
                demoIndex: demoIndex + 1
              }))
            }}
          >
            Next
          </Button>
        </div>
      ),
      placement: 'right',
      disableBeacon: true
    },
    {
      target: '#image-search',
      content: (
        <div>
          <p>
            When your images are done uploading to Lume, they will appear here
            amongst your other images.
          </p>
          <p>
            Don't worry if your image doesn't appear immediately, it can take
            several minutes for images to appear depending on your internet
            speed. Lume allows for large images and it sometimes take a few
            moments for our servers to break those images up into tiles.
          </p>
          <Button
            onClick={() => {
              let image = this.props.images.find(
                image => image.title === "Curator's Office"
              )
              this.handleImageSelect(image)
              this.setState(({ demoIndex }) => ({
                demoIndex: demoIndex + 1
              }))
            }}
          >
            Next
          </Button>
        </div>
      ),
      placement: 'right',
      disableBeacon: true
    },
    {
      target: '#image-manager-zoomer',
      content: (
        <div>
          Once your image has finished uploading and you've selected it, you can
          see it in all its high resolution glory using Lume's special tiled
          image viewer.
          <Button
            onClick={() => {
              this.setState({ showDemo: false })
              this.handleImageSave()
              this.props.onDemoFinish()
            }}
          >
            Use Image for Story
          </Button>
        </div>
      ),
      placement: 'right',
      disableBeacon: true
    }
  ]

  state = {
    selectedTab: 'select',
    search: '',
    miaSearch: '',
    miaImages: [],
    selectedMiaImage: {},
    miaImageButton: '',
    loading: false,
    demoSteps: this.demoSteps,
    demoIndex: 0,
    showDemo: false,
    uploaderDemoFinished: false
  }

  handleDemoChange = async ({ action, index, lifecycle, step }) => {
    try {
      if (action === 'update' && index === 1 && lifecycle === 'tooltip') {
        await this.write("Curator's Office", 'search')
        await this.handleSearch()
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  handleUploaderDemoFinish = () => {
    console.log('handleUploaderDemoFinish', this)

    this.setState({
      showDemo: true,
      showUploaderDemo: false,
      uploaderDemoFinished: true,
      selectedTab: 'select'
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showDemo && !this.state.uploaderDemoFinished) {
      this.setState({
        selectedTab: 'upload',
        showUploaderDemo: true
      })
    }
  }

  render() {
    if (!this.props.images) return null

    const {
      state: {
        selectedTab,
        selectedImageId,
        search,
        miaSearch,
        miaImages,
        selectedMiaImage,
        miaImageButton,
        loading
      },
      props: {
        images,
        router: {
          query: { subdomain }
        }
      },
      handleLoadMore,
      handleImageSave,
      handleChange,
      handleSearch,
      handleRefetch,
      addMiaImageToLume,
      handleMiaImageSearchChange,
      handleSearchChange,
      handleImageSelect,
      handleDeleteImage
    } = this

    return (
      <Container w={'80vw'}>
        {loading ? <Waiting /> : null}
        <TabContainer selectedTab={selectedTab}>
          <TabHeader>
            <Tab
              name={'select'}
              onClick={() => this.setState({ selectedTab: 'select' })}
            >
              Select
            </Tab>

            {subdomain === 'mia' ? (
              <Tab
                name={'mia'}
                onClick={() => this.setState({ selectedTab: 'mia' })}
              >
                Mia Images
              </Tab>
            ) : null}

            <Tab
              name={'upload'}
              onClick={() => this.setState({ selectedTab: 'upload' })}
            >
              Upload
            </Tab>
          </TabHeader>

          <TabBody name={'select'}>
            <Joyride
              run={this.state.showDemo}
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
            <SelectFlex p={1}>
              <OrgImagesFlex
                width={1 / 2}
                flexDirection={'column'}
                p={2}
                id={'select-images-container'}
              >
                <Box width={1} mb={2} id={'image-search'}>
                  <Input
                    value={search}
                    name={'search'}
                    onChange={handleSearchChange}
                    placeholder={'Search images'}
                  />
                </Box>

                <ImageList w={1} flexWrap={'wrap'} p={1}>
                  {images.map(image => (
                    <ImageBox
                      key={image.id}
                      width={[1 / 3]}
                      p={2}
                      onClick={() => handleImageSelect(image)}
                    >
                      <Image
                        image={image}
                        quality={'s'}
                        selected={selectedImageId === image.id}
                      />
                    </ImageBox>
                  ))}
                  <Box width={1}>
                    {images.length < 1 ? (
                      <p>You don't have any images yet</p>
                    ) : null}
                    {images.length % 10 === 0 ? (
                      <Button onClick={handleLoadMore} color={'white'}>
                        Load More
                      </Button>
                    ) : null}
                  </Box>
                </ImageList>
              </OrgImagesFlex>

              <ZoomerInputContainer
                width={1 / 2}
                p={2}
                flexDirection={'column'}
                justifyContent={'center'}
                id={'image-manager-zoomer'}
              >
                {selectedImageId ? (
                  <Zoomer imageId={selectedImageId} mode={'image'} />
                ) : (
                  <H3>Choose an image from the left</H3>
                )}
                {selectedImageId ? (
                  <Flex>
                    <Input
                      name={`${selectedImageId}|title`}
                      value={this.state[`${selectedImageId}|title`] || ''}
                      onChange={handleChange}
                    />
                    <Button color={'red'} onClick={handleDeleteImage}>
                      Delete Image
                    </Button>
                  </Flex>
                ) : null}
                {selectedImageId ? (
                  <Textarea
                    name={`${selectedImageId}|description`}
                    value={this.state[`${selectedImageId}|description`] || ''}
                    onChange={handleChange}
                  />
                ) : null}
              </ZoomerInputContainer>
            </SelectFlex>

            <Button onClick={handleImageSave}>Select</Button>
          </TabBody>

          {subdomain === 'mia' ? (
            <TabBody name={'mia'}>
              <SelectFlex p={1}>
                <OrgImagesFlex width={1 / 2} flexDirection={'column'} p={2}>
                  <Box width={1} mb={2}>
                    <Search
                      value={miaSearch}
                      name={'miaSearch'}
                      onChange={handleMiaImageSearchChange}
                    />
                  </Box>

                  <ImageList w={1} flexWrap={'wrap'} p={1}>
                    {miaImages.map(image => (
                      <ImageBox
                        key={image._id}
                        width={[1 / 3]}
                        p={2}
                        onClick={() => this.handleMiaImageSelect(image)}
                      >
                        <MiaImage
                          src={`https://1.api.artsmia.org/${image._id}.jpg`}
                          selected={selectedMiaImage._id === image._id}
                        />
                      </ImageBox>
                    ))}
                  </ImageList>
                </OrgImagesFlex>

                <Flex width={1 / 2} p={2}>
                  {selectedMiaImage._id ? (
                    <MiaDisplayImage
                      src={`https://1.api.artsmia.org/${
                        selectedMiaImage._id
                      }.jpg`}
                    />
                  ) : null}
                </Flex>
              </SelectFlex>

              {miaImageButton === 'add' ? (
                <Button onClick={addMiaImageToLume}>Add Image to Lume</Button>
              ) : null}

              {miaImageButton === 'use' ? (
                <Button onClick={handleImageSave}>Use Image</Button>
              ) : null}
            </TabBody>
          ) : null}

          <TabBody name={'upload'}>
            <ImageUploader
              subdomain={subdomain}
              refetch={handleRefetch}
              showDemo={this.state.showUploaderDemo}
              onDemoFinish={this.handleUploaderDemoFinish}
              client={this.props.client}
              router={this.props.router}
              tour={this.props.tour}
            />
          </TabBody>
        </TabContainer>
      </Container>
    )
  }

  bounce = true

  debounce = (func, wait) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(func, wait)
    }
  }

  handleDeleteImage = () => {
    this.props.deleteImage({ id: this.state.selectedImageId })
    this.setState({ selectedImageId: '' })
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState(
      () => ({ [name]: value }),
      this.debounce(() => {
        let id = name.split('|')[0]
        this.props.editImage({
          id,
          title: this.state[`${id}|title`],
          description: this.state[`${id}|description`]
        })
      }, 1000)
    )
  }

  handleImageSelect = image => {
    this.setState({
      selectedImageId: image.id,
      [`${image.id}|title`]: image.title,
      [`${image.id}|description`]: image.description
    })
  }

  handleMiaImageSelect = async selectedMiaImage => {
    try {
      this.setState({
        selectedMiaImage,
        miaImageButton: ''
      })

      let result = await this.props.client.query({
        query: ImagesQuery,
        variables: {
          filter: {
            organization: {
              subdomain: 'mia'
            },
            limit: 10,
            localId: selectedMiaImage._id
          }
        },
        fetchPolicy: 'network-only'
      })

      if (result.data.images[0]) {
        this.setState({
          miaImageButton: 'use',
          selectedImageId: result.data.images[0].id
        })
      } else {
        this.setState({ miaImageButton: 'add' })
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  handleSearchChange = ({ target: { value, name } }) => {
    this.setState(
      () => ({ [name]: value }),
      () => {
        this.debounce(this.handleSearch, 2000)
      }
    )
  }

  addMiaImageToLume = async () => {
    try {
      this.setState({ loading: true })

      let response = await fetch(
        `https://1.api.artsmia.org/full/${this.state.selectedMiaImage._id}.jpg`,
        { mode: 'cors' }
      )

      let arrayBuffer = await response.arrayBuffer()

      let file = new File(
        [arrayBuffer],
        this.state.selectedMiaImage._source.title,
        {
          type: 'image/jpeg'
        }
      )

      let form = new FormData()

      form.append('file', file)
      form.append('userId', localStorage.getItem('userId'))
      form.append('title', this.state.selectedMiaImage._source.title)
      form.append(
        'description',
        this.state.selectedMiaImage._source.description
      )
      form.append('subdomain', this.props.router.query.subdomain)
      form.append('localId', this.state.selectedMiaImage._id)

      const url =
        process.env.FILE_STORAGE === 's3'
          ? `${process.env.API_URL}/image`
          : 'http://localhost:3001/upload'

      let options = {
        method: 'POST',
        body: form
      }

      response = await fetch(url, options)

      let json = await response.json()

      this.setState({ loading: false })

      this.props.onImageSave(json.data.image.id)
    } catch (ex) {
      console.error(ex)
    }
  }

  bounce = true

  debounce = (func, wait) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(func, wait)
    }
  }

  handleMiaImageSearchChange = ({ target: { value, name } }) => {
    this.setState(
      () => ({ [name]: value }),
      () => {
        this.debounce(this.handleMiaImageSearch, 2000)
      }
    )
  }

  handleMiaImageSearch = async () => {
    try {
      let response = await fetch(
        `https://search.artsmia.org/${this.state.miaSearch}`
      )

      let json = await response.json()

      this.setState({ miaImages: json.hits.hits })
    } catch (ex) {
      console.error(ex)
    }
  }

  handleImageSave = () => {
    this.props.onImageSave(this.state.selectedImageId)
  }

  handleLoadMore = () => {
    this.props.fetchMore({
      variables: {
        filter: {
          limit: 10,
          organization: {
            subdomain: this.props.router.subdomain
          },
          offset: this.props.images.length
        }
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }

        return Object.assign({}, previousResult, {
          images: [...previousResult.images, ...fetchMoreResult.images]
        })
      }
    })
  }

  handleSearch = () => {
    this.props.refetch({
      filter: {
        ...this.props.variables.filter,
        search: this.state.search
      }
    })
  }

  handleRefetch = async () => {
    try {
      await this.props.refetch()
      this.setState({ selectedTab: 'select' })
    } catch (ex) {
      console.error(ex)
    }
  }
}

const Container = styled(Flex)`
  height: 80vh;
  position: relative;
`

const ImageList = styled(Flex)`
  overflow-y: scroll;
  border: 1px solid ${({ theme }) => theme.color.gray30};
  height: 100%;
`

const ImageBox = styled(Box)`
  height: 150px;
`

const OrgImagesFlex = styled(Flex)`
  height: 100%;
`
const SelectFlex = styled(Flex)`
  height: 100%;
`

const MiaImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  ${({ selected, theme }) =>
    selected
      ? `
    box-shadow: 0 0 10px 3px ${theme.color.green};
  `
      : ''};
`

const MiaDisplayImage = styled.img`
  max-height: 90%;
  max-width: 90%;
  margin: auto;
  object-fit: contain;
`

const ZoomerInputContainer = styled(Flex)`
  height: 100%;
  min-height: 500px;
`

// const SearchRow = styled(Row)`
//   height: auto;
// `
//
// const ImageSearch = styled(Search)`
//   width: 100px;
// `
//
// export const Container = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: stretch;
//   width: 100%;
//   height: 600px;
// `
//
// const PreviewContainer = styled.div`
//   display: flex;
//   width: 100%;
//   height: 600px;
// `
//
// export const ThumbColumn = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   align-items: space-around;
//   align-content: flex-start;
//   flex-wrap: wrap;
//   margin: 10px;
//   width: 40%;
//   border: 1px solid black;
//   overflow-y: scroll;
//   box-sizing: border-box;
//
// `
//
// export const Right = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: stretch;
//   margin: 10px;
//   width: 60%;
//   border: 1px solid black;
// `
