import React from 'react'
import {Component} from 'react'
import {TabContainer, TabHeader, Tab, TabBody} from '../../mia-ui/tabs'
import {Button} from '../../mia-ui/buttons'
import {Search} from '../../mia-ui/forms'
import ImageUploader from './ImageUploader'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Zoomer from '../../shared/Zoomer'
import {GridList, Tile} from '../../mia-ui/lists'
import {Flex, Box} from 'grid-styled'
import {H3} from '../../mia-ui/text'
import imgSrcProvider from '../../shared/ImgSrcProvider'
import fetch from 'isomorphic-unfetch'

const ImageEl = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  ${({selected, theme}) => selected ? `
    box-shadow: 0 0 10px 3px ${theme.color.green};
  ` : ''}
`
let Image = imgSrcProvider(ImageEl)

export default class ImageManager extends Component {


  state = {
    selectedTab: "select",
    search: "",
    miaSearch: "",
    miaImages: [],
    selectedMiaImage: {}
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
        selectedMiaImage
      },
      props: {
        images,
        router: {
          query: {
            subdomain
          }
        },
        organization
      },
      handleLoadMore,
      handleImageSave,
      handleChange,
      handleSearch,
      handleRefetch,
      addMiaImageToLume,
      handleMiaImageSearchChange,
      handleSearchChange
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

            {(subdomain === 'mia') ? (
              <Tab
                name={"mia"}
                onClick={()=>this.setState({selectedTab: "mia"})}
              >
                Mia Images
              </Tab>
            ): <div/>}


            <Tab
              name={"upload"}
              onClick={()=>this.setState({selectedTab: "upload"})}
            >
              Upload
            </Tab>
          </TabHeader>

          <TabBody
            name={"select"}
          >
            <SelectFlex
              p={1}
            >
                <OrgImagesFlex
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


                  <ImageList
                    w={1}
                    flexWrap={'wrap'}
                    p={1}
                  >
                    {images.map(image => (
                      <ImageBox
                        key={image.id}
                        width={[1/3]}
                        p={2}
                        onClick={()=>this.setState({selectedImageId: image.id})}
                      >
                        <Image
                          image={image}
                          quality={"s"}
                          selected={(selectedImageId === image.id)}
                        />

                      </ImageBox>
                    ))}
                    <Box
                      width={1}
                    >
                      {(images.length < 1) ? (
                        <p>You don't have any images yet</p>
                      ):null}
                      {(images.length % 10 === 0) ? (
                        <Button
                          onClick={handleLoadMore}
                          color={'white'}
                        >
                          Load More
                        </Button>
                      ): null}
                    </Box>
                  </ImageList>




            </OrgImagesFlex>




              <Flex
                width={1/2}
                p={2}
              >
                {(selectedImageId) ? (
                  <Zoomer
                    imageId={selectedImageId}
                  />
                ): (
                  <H3>
                    Choose an image from the left
                  </H3>
                )}
              </Flex>
            </SelectFlex>




            <Button
              onClick={handleImageSave}
            >
              Select
            </Button>
          </TabBody>


          {(subdomain === 'mia') ? (
            <TabBody
              name={"mia"}
            >
              <SelectFlex
                p={1}
              >
                  <OrgImagesFlex
                    width={1/2}
                    flexDirection={'column'}
                    p={2}
                  >
                    <Box
                      width={1}
                      mb={2}
                    >
                      <Search
                        value={miaSearch}
                        name={"miaSearch"}
                        onChange={handleMiaImageSearchChange}
                      />


                    </Box>


                    <ImageList
                      w={1}
                      flexWrap={'wrap'}
                      p={1}
                    >
                      {miaImages.map(image => (
                        <ImageBox
                          key={image._id}
                          width={[1/3]}
                          p={2}
                          onClick={()=>this.setState({selectedMiaImage: image})}
                        >
                          <MiaImage
                            src={`https://1.api.artsmia.org/${image._id}.jpg`}
                            selected={(selectedMiaImage._id === image._id)}
                          />

                        </ImageBox>
                      ))}

                    </ImageList>




              </OrgImagesFlex>




                <Flex
                  width={1/2}
                  p={2}
                >
                  {(selectedMiaImage._id) ? (
                    <MiaDisplayImage
                      src={`https://1.api.artsmia.org/${selectedMiaImage._id}.jpg`}
                    />
                  ):null}
                </Flex>
              </SelectFlex>




              <Button
                onClick={addMiaImageToLume}
              >
                Use Image
              </Button>
            </TabBody>
          ):<div/>}




          <TabBody
            name={"upload"}
          >
            <ImageUploader
              subdomain={subdomain}
              refetch={handleRefetch}
            />
          </TabBody>
        </TabContainer>
      </Container>
    )
  }

  handleSearchChange = ({target: {value, name}}) => {
    this.setState(
      ()=>({[name]:value}),
      ()=>{
        this.debounce(this.handleSearch, 2000)
      }
    )
  }

  addMiaImageToLume = async () => {
    try {

      let response = await fetch(`https://1.api.artsmia.org/full/${this.state.selectedMiaImage._id}.jpg`, {mode: 'cors'})

      let arrayBuffer = await response.arrayBuffer()

      let file = new File([arrayBuffer], this.state.selectedMiaImage._source.title, {
        type: 'image/jpeg'
      })

      let form = new FormData()

      form.append("file", file)
      form.append("userId", localStorage.getItem('userId'))
      form.append("title", this.state.selectedMiaImage._source.title)
      form.append("alt", this.state.selectedMiaImage._source.description)
      form.append("subdomain", this.props.organization.subdomain)

      const url  = (process.env.FILE_STORAGE === 's3') ? `${process.env.API_URL}/image` : 'http://localhost:3001/upload'

      let options = {
        method: 'POST',
        body: form
      }

      response = await fetch(url, options)

      await response.json()

    } catch (ex) {
      console.error(ex)
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

  handleMiaImageSearchChange = ({target: {value, name}}) => {
    this.setState(
      ()=>({[name]:value}),
      ()=>{
        this.debounce(this.handleMiaImageSearch, 2000)
      }
    )
  }

  handleMiaImageSearch = async () => {
    try {
      let response = await fetch(`http://search.artsmia.org/${this.state.miaSearch}`)

      let json = await response.json()

      this.setState({miaImages: json.hits.hits})

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
          organizationId: this.props.organization.id,
          offset: this.props.images.length
        }
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult }

        return Object.assign({}, previousResult, {
          images: [...previousResult.images, ...fetchMoreResult.images]
        })
      },
    })
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

handleRefetch = async () => {
  try {
    await this.props.refetch()
    this.setState({selectedTab: "select"})
  } catch (ex) {
    console.error(ex)
  }
}


}


const Container = styled(Flex)`
  width: 80vw;
  height: 80vh;
`

const ImageList = styled(Flex)`
  overflow-y: scroll;
  border: 1px solid ${({theme}) => theme.color.gray30};
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
  ${({selected, theme}) => selected ? `
    box-shadow: 0 0 10px 3px ${theme.color.green};
  ` : ''}
`

const MiaDisplayImage = styled.img`
  max-height: 90%;
  max-width: 90%;
  margin: auto;
  object-fit: contain;
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
