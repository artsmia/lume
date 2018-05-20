import React, { Component } from 'react'
import {
  ChangeImage,
  MultiImage,
  DetailSelector
} from '../../cms/DefaultEditors'
import OrganizationQuery from '../../../apollo/queries/organization'
import { withRouter } from 'next/router'
import query from '../../../apollo/queries/content'
import mutation from '../../../apollo/mutations/editContent'
import setSaveStatus from '../../../apollo/local/setSaveStatus'
import { compose, withApollo } from 'react-apollo'
import styled from 'styled-components'
import { H2 } from '../../mia-ui/text'
import { Button } from '../../mia-ui/buttons'
import { Flex, Box } from 'grid-styled'
import { Title, Description } from '../../mia-ui/forms'
import DeleteContentButton from '../../cms/DeleteContentButton'
import MultiMedia from '../../cms/DefaultEditors/MultiMedia'
import { ContentZoomer } from '../../shared/Zoomer'
import Joyride from 'react-joyride'
import { ImagesQuery } from '../../../apollo/queries/images'

class DetailEditor extends Component {
  render() {
    if (!this.props.content) return null

    const {
      state: { title, description, image0Id },
      saveEdits,
      props: {
        content,
        content: { additionalImages, additionalMedias, image0 },
        organization
      },
      handleChange,
      handleAddAdditionalImage,
      handleRemoveAdditionalImage,
      handleAddAdditionalMedia,
      handleRemoveAdditionalMedia
    } = this

    return (
      <Flex width={1} p={3}>
        <Flex width={1 / 2} flexWrap={'wrap'} pr={3} id={'edit-details'}>
          <Box w={1}>
            <Title
              name={'title'}
              value={title}
              onChange={handleChange}
              label={'Title'}
            />
          </Box>
          <Box w={1}>
            <Description
              name={'description'}
              value={description}
              onChange={handleChange}
              label={'Description'}
            />
          </Box>
          <Box w={1} id={'additional-images'}>
            <MultiImage
              label={'Additional Images'}
              additionalImages={additionalImages}
              onAdd={handleAddAdditionalImage}
              onRemove={handleRemoveAdditionalImage}
            />
          </Box>
          <Box w={1} id={'additional-media'}>
            <MultiMedia
              label={'Additional Media'}
              additionalMedias={additionalMedias}
              onAdd={handleAddAdditionalMedia}
              onRemove={handleRemoveAdditionalMedia}
            />
          </Box>
        </Flex>
        <Flex width={1 / 2} flexWrap={'wrap'}>
          <Box w={1}>
            <ChangeImage
              label={'Image'}
              name={'image0Id'}
              image={image0}
              onChange={handleChange}
            />
          </Box>
          <Flex w={1}>
            {/* <DetailSelector
              label={"Selection"}
              value={geometry}
              name={"geometry"}
              onChange={handleChange}
              detailImageId={image0Id}
            /> */}
            <ZoomerBox width={1} id={'zoomer-box'}>
              <ContentZoomer contentId={content.id} mode={'editor'} />
            </ZoomerBox>
          </Flex>

          <Box w={1} my={5}>
            <DeleteContentButton contentId={content.id} />
          </Box>
        </Flex>
        <Joyride
          run={this.props.showDemo ? true : false}
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
          disableOverlayClose={true}
          disableCloseOnEscape={true}
        />
      </Flex>
    )
  }

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
        await this.wait(15)
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

  handleDemoChange = async ({ index, lifecycle, action }) => {
    try {
      if (action === 'update' && index === 0 && lifecycle === 'tooltip') {
        await this.write('Subtext', 'title')
        //await this.write("The bookshelf in particular offers a special glimpse into Kestle’s personal and professional interests, among them Basic Russian and Das Kapital.  Whether readings for pleasure or politics is uncertain, but perhaps the answer can be read in his eventual disappearance.", "description")

        let {
          data: { images }
        } = await this.props.client.query({
          query: ImagesQuery,
          variables: {
            filter: {
              organization: {
                subdomain: this.props.router.query.subdomain
              },
              search: "Curator's Office"
            }
          }
        })

        await this.handleChange({
          target: { name: 'image0Id', value: images[0].id }
        })
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  demoSteps = [
    {
      target: '#edit-details',
      content: (
        <div>
          <p>
            A detail content allows for a title, description, and image like
            many of the other contents.{' '}
          </p>
          <Button
            onClick={() => {
              this.setState(({ demoIndex }) => ({ demoIndex: demoIndex + 1 }))
              this.props.editContent({
                id: this.props.content.id,
                geoJSON: {
                  type: 'FeatureCollection',
                  features: [
                    {
                      type: 'Feature',
                      geometry: {
                        type: 'Polygon',
                        coordinates: [
                          [
                            [198.397487, -85.674805],
                            [198.397487, -44.378906],
                            [251.282861, -44.378906],
                            [251.282861, -85.674805],
                            [198.397487, -85.674805]
                          ]
                        ]
                      }
                    }
                  ]
                }
              })
            }}
          >
            Next
          </Button>
        </div>
      ),
      disableBeacon: true,
      placement: 'right'
    },
    {
      target: '#zoomer-box',
      content: (
        <div>
          <p>
            Notice how a detail contents allow you to highlight a selection from
            the image.{' '}
          </p>
          <p>
            You can use detail content's to draw attention to interesting
            elements in your object's image.
          </p>
          <Button
            onClick={() => {
              this.setState(({ demoIndex }) => ({ demoIndex: demoIndex + 1 }))
            }}
          >
            Next
          </Button>
        </div>
      ),
      disableBeacon: true,
      placement: 'left'
    },
    {
      target: '#additional-images',
      content: (
        <div>
          <p>You can also add more images.</p>
          <Button
            onClick={() => {
              this.setState(({ demoIndex }) => ({ demoIndex: demoIndex + 1 }))
            }}
          >
            Next
          </Button>
        </div>
      ),
      disableBeacon: true,
      placement: 'left'
    },
    {
      target: '#additional-media',
      content: (
        <div>
          <p>You can also add more media.</p>
          <Button
            onClick={() => {
              this.setState(({ demoIndex }) => ({ demoIndex: demoIndex + 1 }))
              this.props.onDemoFinish()
            }}
          >
            Next
          </Button>
        </div>
      ),
      disableBeacon: true,
      placement: 'left'
    }
  ]

  bounce = true

  debounce = (func, wait) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(func, wait)
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      image0Id: '',
      demoIndex: 0,
      demoSteps: this.demoSteps
    }
    this.state = {
      ...this.state,
      ...this.stateFromProps(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.stateFromProps(nextProps) })
  }

  handleChange = ({ target: { value, name } }) => {
    this.props.setSaveStatus({
      synced: false
    })
    this.setState(
      () => ({
        [name]: value
      }),
      () => {
        this.debounce(this.saveEdits, 2000)
      }
    )
  }

  saveEdits = async () => {
    try {
      let edits = {
        title: this.state.title,
        description: this.state.description,
        image0Id: this.state.image0Id || undefined
      }

      await this.props.editContent({ ...edits })

      this.props.setSaveStatus({
        synced: true
      })
    } catch (ex) {
      console.error(ex)
    }
  }

  stateFromProps = props => {
    if (!props.content || props.contentId === this.state.id) return {}

    let { content } = props
    let state = {
      title: content.title || '',
      description: content.description || '',
      image0Id: content.image0 ? content.image0.id : '',
      id: content.id
    }

    return state
  }

  handleAddAdditionalImage = addAdditionalImageId => {
    this.props.editContent({
      addAdditionalImageId
    })
  }

  handleRemoveAdditionalImage = removeAdditionalImageId => {
    this.props.editContent({
      removeAdditionalImageId
    })
  }

  handleAddAdditionalMedia = addAdditionalMediaId => {
    this.props.editContent({
      addAdditionalMediaId
    })
  }

  handleRemoveAdditionalMedia = removeAdditionalMediaId => {
    this.props.editContent({
      removeAdditionalMediaId
    })
  }
}

const ZoomerBox = styled(Box)`
  min-height: 500px;
`

let ExportComponent = DetailEditor

ExportComponent = compose(
  query,
  mutation,
  setSaveStatus,
  OrganizationQuery,
  withApollo
)(DetailEditor)

ExportComponent = withRouter(ExportComponent)

export default ExportComponent
