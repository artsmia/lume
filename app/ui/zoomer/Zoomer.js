import react, {Component} from 'react'
import LeafletCss from './LeafletCss'
import {s3Url, apiUrl} from '../../config'
const L = (typeof window === 'object') ? require('leaflet') : null

export default class extends Component {

  render() {
    return (
      <LeafletCss>
        <div
          ref={"mapRef"}
          style={{
            width: '100%',
            height: '100vh'
          }}
        />
      </LeafletCss>
    )
  }

  componentDidMount(){
    this.mountL()
  }

  mountL = async () => {
    try {
      let {
        props: {
          organizationId,
          imageId
        },
        refs: {
          mapRef,
        },
        map
      } = this

      const response = await fetch(`${apiUrl}/iiif/${imageId}/info.json`, {
        method: "GET"
      })

      const {
        height,
        width
      } = await response.json()

      // L.TileLayer.Knight = L.TileLayer.extend({
      //
      //
      // })
      //
      // L.tileLayer.knight = function(...args){
      //   return new L.TileLayer.Knight(...args)
      // }

      const tileLayer = L.tileLayer(
        `${s3Url}/${organizationId}/${imageId}/tiles/{z}-{x}-{y}.png`, {
          tileSize: 512
        }
      )

      const mapOptions = {
        crs: L.CRS.Simple,
        minZoom: 0,
        maxZoom: 3,
        zoomSnap: .5
      }

      map = L.map(mapRef, mapOptions)

      map.on("load", (e) => {
        console.log(e)
      })

      map.setView([-256, 256], 3)

      tileLayer.addTo(map)




    } catch (ex) {
      console.error(ex)
    }
  }
}
