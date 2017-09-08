import {Component} from 'react'
import styled from 'styled-components'
import LeafletCss from './LeafletCss'
import {s3Url, apiUrl} from '../../config'
const L = (typeof window === 'object') ? require('./MuseumTileLayer') : null


export default class extends Component {

  state = {
    zoomCreated: false,
    zoomLoading: false
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
      zoomLoading,
      zoomLoaded
    } = this.state
    if (!zoomLoading && !zoomLoaded) {
      this.createZoomer()
    }
  }


  createZoomer = async () => {
    try {

      await this.promiseState( (prevState) => {
        return {
          zoomLoading: true
        }
      })



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
        crs: L.CRS.Simple,
      })

      this.tiles = L.tileLayer(`${s3Url}/${bucketId}/{imageId}/tiles/{z}-{x}-{y}.png`, {
        imageId,
        height,
        width,
        tileSize: 512
      })

      this.map.setView([-256,256], 0)


      // this.map.setView([0,0], this.map.getMaxZoom())
      //
      //
      // this.tiles = L.museumTileLayer(`${s3Url}/${bucketId}/{imageId}/tiles/{z}-{x}-{y}.png`, {
      //   imageId,
      //   height,
      //   width,
      //   tileSize: 512
      // })



      this.tiles.addTo(this.map)


      await this.promiseState( (prevState) => {
        return {
          zoomLoaded: true
        }
      })


    } catch (ex) {
      console.error(ex)
    }
  }

  promiseState = (newState) => {
    return new Promise( (resolve, reject) => {
      this.setState(
        newState,
        resolve
      )
    })
  }

}

const ZoomerMap = styled.div`
  height: 100%;
  width: 100%;
`
