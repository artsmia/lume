import React from 'react'
import {Component} from 'react'
import {TabContainer, TabHeader, Tab, TabBody} from '../../mia-ui/tabs'
import {Button} from '../../mia-ui/buttons'
import {Search} from '../../mia-ui/forms'
import ImageUploader from './ImageUploader'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Image from '../../shared/Image'
import Zoomer from '../../shared/Zoomer'
import {GridList, Tile} from '../../mia-ui/lists'
import getImageSrc from '../../../utils/getImageSrc'
import {Flex, Box} from 'grid-styled'


export default class ImageManager extends Component {


  state = {
    selectedTab: "select",
    search: ""
  }

  render() {

    if (!this.props.images) return null

    const {
      state: {
        selectedTab,
        selectedImageId,
        search
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
      handleRefetch
    } = this

    console.log(this.props)

    return (
      <Flex>

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
              name={"upload"}
              onClick={()=>this.setState({selectedTab: "upload"})}
            >
              Upload
            </Tab>
          </TabHeader>

          <TabBody
            name={"select"}
          >
            <Flex>
                <Flex
                  width={1/2}
                  flexDirection={'column'}
                  flexWrap={'wrap'}
                >
                  <Box
                    width={1}
                  >
                    <Search
                      value={search}
                      name={"search"}
                      onChange={handleChange}
                    />
                    <Button
                      onClick={handleSearch}
                    >
                      Search
                    </Button>

                  </Box>


                <GridList>

                  {images.map( (image) => (
                    <Tile
                      key={image.id}
                      onClick={()=>this.setState({selectedImageId: image.id})}
                      selected={(selectedImageId === image.id)}
                      height={"80px"}
                      src={getImageSrc({
                        image,
                        organization,
                        quality: 's'
                      })}
                      alt={image.title}
                      text={image.title}
                    />
                  ))}

                </GridList>


              {(images.length < 1) ? (
                <p>You don't have any images yet</p>
              ):null}
              {(images.length % 10 === 0) ? (
                <Button
                  onClick={handleLoadMore}
                >
                  Load More
                </Button>
              ): null}

            </Flex>




              <Flex
                width={1/2}
              >
                {(selectedImageId) ? (
                  <Zoomer
                    imageId={selectedImageId}
                  />
                ): <p>Choose an image from the left</p>}
              </Flex>
            </Flex>




            <Button
              onClick={handleImageSave}
            >
              Select
            </Button>
          </TabBody>
          <TabBody
            name={"upload"}
          >
            <ImageUploader
              subdomain={subdomain}
              refetch={handleRefetch}
            />
          </TabBody>
        </TabContainer>
      </Flex>
    )
  }


  handleImageSave = () => {
    this.props.onImageSave(this.state.selectedImageId)
  }

  handleLoadMore = () => {
    this.props.fetchMore({
      variables: {
        filter: {
          limit: 10,
          organizationId: this.props.orgId,
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
