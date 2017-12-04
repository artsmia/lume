import {Component} from 'react'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import ImagePicker from './ImagePicker'
import ImageUploader from './ImageUploader'
// import GdriveImageUploader from './GdriveImageUploader'
import styled from 'styled-components'
import {PropTypes} from 'prop-types'
import apiFile from '../../utils/apiFile'
import Snackbar from '../../ui/Snackbar'

export default class extends Component {

  static propTypes = {
    orgSub: PropTypes.string.isRequired,
    imageId: PropTypes.string,
    onImageSave: PropTypes.func,
  }


  state = {
    snackMessage: "",
    snackId: "",
    selectedTab: "select"
  }

  render() {


    console.log(this.props)

    if (
      this.props.data.loading ||
      !this.props.data.images
    ) return null


    const {
      props: {
        imageId,
        onImageSave,
        data: {
          images: imageList,
          image,
          organization: {
            id: orgId
          },
          refetch
        },
      },
      state: {
        snackMessage,
        snackId,
        selectedTab
      },
      handleLoadMore
    } = this

    let images = []

    if (
      Array.isArray(imageList)
    ) {
      images = imageList.concat()

      if (
        imageId &&
        image
      ) {
        console.log("here")

        if (
          !imageList.find( listImage => listImage.id === imageId)
        ) {
          images.push(image)
        }
      }
    }




    return (
      <Container>
        <Snackbar
          message={snackMessage}
          snackId={snackId}
        />
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
            <ImagePicker
              images={images}
              imageId={imageId}
              onImageSave={onImageSave}
              onLoadMore={handleLoadMore}
            />
          </TabBody>
          <TabBody
            name={"upload"}
          >
            <ImageUploader
              orgId={orgId}
              refetch={refetch}
            />
          </TabBody>
        </TabContainer>
      </Container>
    )
  }

  componentWillReceiveProps(nextProps){
    if (
      Array.isArray(nextProps.data.images) &&
      nextProps.data.images.length === 0
    ) {
      this.setState({selectedTab: "upload"})
    }
  }


  handleLoadMore = () => {
    this.props.data.fetchMore({
      variables: {
        filter: {
          limit: 10,
          organizationId: this.props.orgId,
          offset: this.props.data.images.length
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

}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 600px;
`
