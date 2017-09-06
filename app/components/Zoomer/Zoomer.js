import {Component} from 'react'
import styled from 'styled-components'
import LeafletCss from './LeafletCss'
import {s3Url, apiUrl} from '../../config'
const L = (typeof window === 'object') ? require('./MuseumTileLayer') : null


export default class extends Component {

  state = {
    zoomerCreated: false
  }

  render() {

    if (this.props.data.loading) return null
    return (
      <LeafletCss>
        <ZoomerMap
          innerRef={mapRef => this.mapRef = mapRef}
        />
      </LeafletCss>
    )
  }

  componentDidUpdate(){
    const {
      zoomerCreated
    } = this.state
    if (!zoomerCreated && !this.props.data.loading && this.props.imageId) {
      this.createZoomer()
    }
  }


  createZoomer = async () => {
    try {

      const {
        mapRef,
        props: {
          imageId,
          data: {
            image: {
              organization: {
                id: bucketId
              }
            }
          }
        }
      } = this


      const response = await fetch(`${apiUrl}/iiif/${imageId}/info.json`, {
        method: "GET"
      })

      const {
        height,
        width
      } = await response.json()


      this.map = L.map(mapRef, {
        crs: L.CRS.Simple
      })

      this.map.setView([width / 2, height / 2], 0)

      this.tiles = L.museumTileLayer(`${s3Url}/${bucketId}/{imageId}/tiles/{z}-{x}-{y}.png`, {
        imageId,
        height,
        width,
        tileSize: 512
      })

      this.tiles.addTo(this.map)

      this.setState({zoomerCreated: true})


    } catch (ex) {
      console.error(ex)
    }
  }


}

const ZoomerMap = styled.div`
  height: 100%;
  width: 100%;
`
