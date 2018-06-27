import React, { Component } from 'react'
import { ChangeImage, MultiImage } from '../../cms/DefaultEditors'
import query from '../../../apollo/queries/content'
import OrganizationQuery from '../../../apollo/queries/organization'
import { withRouter } from 'next/router'

import mutation from '../../../apollo/mutations/editContent'
import { compose, withApollo } from 'react-apollo'
import styled from 'styled-components'
import { H2 } from '../../mia-ui/text'
import { Row, Column } from '../../mia-ui/layout'
import setSaveStatus from '../../../apollo/local/setSaveStatus'
import { Flex, Box } from 'grid-styled'
import {
  Title,
  Description,
  TextInput,
  Select,
  Option,
  CheckboxInput,
  Label
} from '../../mia-ui/forms'
import DeleteContentButton from '../../cms/DeleteContentButton'
import { MapZoomer } from '../../shared/Zoomer'

class MapEditor extends Component {
  render() {
    if (!this.props.content) return null

    const {
      state: {
        title,
        description,
        image0Id,
        mapUrl,
        mapKey,
        mapUrlSelect,
        customMapToken
      },
      saveEdits,
      handleChange,
      props: { organization, content }
    } = this

    return (
      <Flex w={1}>
        <Flex w={[1, 1 / 2]} flexWrap={'wrap'} m={3}>
          <Box w={1}>
            <Title
              label={'Title'}
              value={title}
              name={'title'}
              onChange={handleChange}
            />
          </Box>
          <Box w={1}>
            <Description
              label={'Description'}
              value={description}
              name={'description'}
              onChange={handleChange}
            />
          </Box>
          <Box w={1}>
            <ChangeImage
              label={'Image'}
              name={'image0Id'}
              image={content.image0}
              onChange={handleChange}
            />
          </Box>
          {/* <Box w={1} id={'additional-images'}>
          <MultiImage
            label={'Additional Images'}
            additionalImages={additionalImages}
            onAdd={handleAddAdditionalImage}
            onRemove={handleRemoveAdditionalImage}
          />
        </Box> */}
          <Box w={1}>
            <Label>Map</Label>
            <Select
              name={'mapUrlSelect'}
              value={mapUrlSelect}
              onChange={this.handleSelectChange}
            >
              {this.mapIds.map(id => (
                <Option
                  key={id}
                  value={`https://api.tiles.mapbox.com/v4/mapbox.${id}/{z}/{x}/{y}.png?access_token={accessToken}`}
                >
                  {id}
                </Option>
              ))}
              <Option value={'custom'}>Custom</Option>
            </Select>

            {mapUrlSelect === 'custom' ? (
              <TextInput
                label={'Map Url'}
                name={'mapUrl'}
                value={mapUrl || ''}
                onChange={handleChange}
              />
            ) : null}
          </Box>
          <Box w={1}>
            <CheckboxInput
              label={'Use Custom Map Token'}
              checked={customMapToken}
              name={'customMapToken'}
              onChange={this.handleCheck}
            />
            {customMapToken ? (
              <TextInput
                label={'Map Access Token'}
                name={'mapKey'}
                value={mapKey || ''}
                onChange={handleChange}
              />
            ) : null}
          </Box>
          <Box w={1} my={5}>
            <DeleteContentButton contentId={this.props.content.id} />
          </Box>
        </Flex>
        <Right w={[1, 1 / 2]} flexWrap={'wrap'} m={3}>
          <MapZoomer contentId={this.props.content.id} mode={'editor'} />
        </Right>
      </Flex>
    )
  }

  handleCheck = ({ target: { name, checked } }) => {
    this.setState({ [name]: checked })
  }

  handleSelectChange = ({ target: { name, value } }) => {
    if (value === 'custom') {
      this.setState({
        [name]: value,
        mapUrl: ''
      })
    } else {
      this.setState(
        () => ({
          [name]: value,
          mapUrl: value
        }),
        () => {
          this.debounce(this.saveEdits, 500)
        }
      )
    }
  }

  mapIds = [
    'streets',
    'light',
    'dark',
    'satellite',
    'streets-satellite',
    'wheatpaste',
    'streets-basic',
    'comic',
    'outdoors',
    'run-bike-hike',
    'pencil',
    'pirates',
    'emerald',
    'high-contrast'
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
      mapUrlSelect: '',
      customMapToken: false
    }

    this.state = {
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
      const { title, description, image0Id, mapUrl, mapKey } = this.state

      await this.props.editContent({
        title,
        description,
        mapUrl,
        mapKey,
        image0Id: image0Id || undefined
      })

      await this.props.setSaveStatus({
        synced: true
      })
    } catch (ex) {
      console.error(ex)
    }
  }

  stateFromProps = props => {
    if (!props.content || props.contentId === this.state.id) {
      return
    }
    let {
      content,
      content: { image0, mapUrl, mapKey }
    } = props

    let mapUrls = this.mapIds.map(
      id =>
        `https://api.tiles.mapbox.com/v4/mapbox.${id}/{z}/{x}/{y}.png?access_token={accessToken}`
    )

    let mapUrlSelect = mapUrls.includes(mapUrl) ? mapUrl : 'custom'

    let customMapToken = mapKey ? true : false

    return {
      ...content,
      image0Id: image0 ? image0.id : '',
      mapUrlSelect,
      customMapToken
    }
  }
}

const Right = styled(Flex)`
  height: 100%;
  position: relative;
  min-height: 500px;
`

let ExportComponent = MapEditor

ExportComponent = compose(query, mutation, setSaveStatus, OrganizationQuery)(
  ExportComponent
)

ExportComponent = withRouter(ExportComponent)

export default ExportComponent
