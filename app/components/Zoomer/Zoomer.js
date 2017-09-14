import {Component} from 'react'
import styled from 'styled-components'
import LeafletCss from './LeafletCss'
import {s3Url, apiUrl} from '../../config'
const L = (typeof window === 'object') ? require('leaflet') : null


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
    if (!zoomLoading && !zoomLoaded && !this.props.data.loading) {
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

      let {
        height,
        width
      } = await response.json()



      const larger = Math.max(height, width)
      const tileSize = 512

      let maxTiles = Math.ceil(larger / tileSize)

      let maxZoom = Math.log2(maxTiles)

      while (
        height > tileSize ||
        width > tileSize
      ) {
        height = height / 2
        width = width / 2
      }


      let ne = L.latLng(0, width)
      let sw = L.latLng(-1 * height, 0)



      const bounds = L.latLngBounds(sw, ne)


      this.map = L.map(mapRef, {
        crs: L.CRS.Simple,
        maxBounds: bounds,
        zoomSnap: 0
      })

      const container = this.map.getContainer()

      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight

      const longDimension = Math.max(containerWidth, containerHeight)

      const initialZoom = Math.log2(longDimension / tileSize)

      L.TileLayer.Knight = L.TileLayer.extend({
        createTile({z,x,y}) {
          let tile = document.createElement("div")
          let image = document.createElement("img")
          image.src = this._url.replace("{z}",z).replace("{x}", x).replace("{y}", y)
          image.style["object-fit"] = "contain"
          tile.appendChild(image)
          // tile.style.outline = '1px solid red'

          return tile
        }
      })

      L.tileLayer.knight = function(...args){
        return new L.TileLayer.Knight(...args)
      }


      this.tiles = L.tileLayer.knight(`${s3Url}/${bucketId}/${imageId}/tiles/{z}-{x}-{y}.png`, {
        tileSize,
        maxNativeZoom: maxZoom,
        minNativeZoom: 0,
        noWrap: true,
        bounds,
        minZoom: initialZoom
      })


      this.map.setView([height / 2, -1 * width / 2], initialZoom)

      this.map.on('zoomstart', (e) => {

        let zoomReq = e.target._zoom

        if (zoomReq < initialZoom) {
          e.target._zoom = initialZoom
        } else {
          e.target._zoom = Math.round(zoomReq * 2) / 2
        }

      })


      this.tiles.addTo(this.map)

      this.map.invalidateSize()
      this.map.fitBounds(bounds)


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
