import {Component} from 'react'
import styled from 'styled-components'
import LeafletCss from './LeafletCss'
import {s3Url, apiUrl, url} from '../../config'
const L = (typeof window === 'object') ? require('leaflet') : null


export default class extends Component {

  static defaultProps = {
    geometry: false,
    onCrop(geometry){console.log(geometry)}
  }

  state = {
    zoomCreated: false,
    zoomLoading: false,
    cropperLoading: false,
    cropperCreated: false,
    geometryLoading: false,
    geometryCreated: false,
    geometry: false
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

  constructor(props){
    super(props)
    const {
      geometry
    } = props
    this.state = {
      ...this.state,
      geometry
    }
  }

  componentWillReceiveProps({geometry}){
    this.setState({geometry})
  }

  componentDidUpdate(){
    this.setup()
  }

  setup = async() => {
    try {

      if (!this.state.zoomLoading && !this.state.zoomLoaded && !this.props.data.loading) {
        await this.createZoomer()
      }

      if (this.state.zoomLoaded && this.props.crop && !this.state.cropperLoading && !this.state.cropperCreated) {
        await this.createCropper()
      }

      if (this.state.zoomLoaded && this.state.geometry && !this.state.geometryLoading && !this.state.geometryCreated) {
        await this.showCrop()
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  showCrop = async () => {
    try {

      await this.promiseState( (prevState) => {
        return {
          geometryLoading: true
        }
      })

      let {_northEast, _southWest} = this.map.getBounds()
      let north = _northEast.lat
      let south = _southWest.lat
      let east = _northEast.lng
      let west = _southWest.lng

      let [
        coordinates
      ] = this.state.geometry.coordinates

      let lats = coordinates.map(([lat,lng]) => lat)
      let lngs = coordinates.map(([lat,lng]) => lng)

      let top = Math.max(...lats)
      let bottom = Math.min(...lats)
      let left = Math.min(...lngs)
      let right = Math.max(...lngs)


      let bounds = [
        [
          [north, west],
          [north, east],
          [south, east],
          [south, west]],
        [
          [top, left],
          [top, right],
          [bottom, right],
          [bottom, left]
        ]
      ]

      if (this.map.highlight) {
        this.map.highlight.setLatLngs(bounds)
      } else {
        this.map.highlight = L.polygon(bounds, {
          stroke: false,
          fillColor: "black",
          fillOpacity: .5,
        })
        this.map.highlight.addTo(this.map)
      }

      await this.promiseState( (prevState) => {
        return {
          geometryLoading: false,
          geometryCreated: true
        }
      })

    } catch (ex) {
      console.error(ex)
    }
  }

  createCropper = async () => {
    try {

      await this.promiseState( (prevState) => {
        return {
          cropperLoading: true
        }
      })

      const {
        topleft,
        bottomright,
      } = this.state



      L.Control.Cropper = L.Control.extend({


        onAdd(map){

          map.cropStart = false
          map.cropEnd = false
          map.cropping = false

          this.button = L.DomUtil.create('button')
          L.DomUtil.setClass(this.button, "crop-button")

          L.DomEvent.on(
            this.button,
            "click",
            (e)=>{
              if (!map.cropping && !map.cropStart && !map.cropEnd) {
                map.cropping = true
                map._container.style.cursor = "crosshair"
                map.dragging._draggable._enabled = false
                map.highlight.remove()
                map.highlight = false
              } else if (!map.cropping && map.cropStart && map.cropEnd) {
                map.cropping = true
                map.cropStart.remove()
                map.cropStart = false
                map.cropEnd.remove()
                map.cropEnd = false
                map.highlight.remove()
                map.highlight = false
                map.dragging._draggable._enabled = false
                map._container.style.cursor = "crosshair"
              }
            }
          )

          return this.button
        },

      })
      L.control.cropper = function(...args){
        return new L.Control.Cropper(...args)
      }

      L.control.cropper({
        position: "bottomleft"
      }).addTo(this.map)

      let icon = L.icon({
        iconUrl: `${url}/static/x.png`,
        iconSize: 30,
        iconAnchor: [15,15]
      })

      function createMarker(latlng){
        return L.marker(latlng, {
          icon,
          draggable: true
        })
      }

      const saveGeometryToState  = () => {
        let lats = [
          this.map.cropStart._latlng.lat,
          this.map.cropEnd._latlng.lat
        ]
        let lngs = [
          this.map.cropStart._latlng.lng,
          this.map.cropEnd._latlng.lng
        ]
        let top = Math.max(...lats)
        let bottom = Math.min(...lats)
        let left = Math.min(...lngs)
        let right = Math.max(...lngs)

        const geometry = {
          type: "Polygon",
          coordinates: [[
            [top,left],
            [top, right],
            [bottom, right],
            [bottom, left],
            [top, left]
          ]]
        }

        this.setState({geometry})
        this.props.onCrop(geometry)
      }

      const highlightSelection = () =>{

        let {_northEast, _southWest} = this.map.getBounds()
        let north = _northEast.lat
        let south = _southWest.lat
        let east = _northEast.lng
        let west = _southWest.lng
        let lats = [
          this.map.cropStart._latlng.lat,
          this.map.cropEnd._latlng.lat
        ]
        let lngs = [
          this.map.cropStart._latlng.lng,
          this.map.cropEnd._latlng.lng
        ]
        let top = Math.max(...lats)
        let bottom = Math.min(...lats)
        let left = Math.min(...lngs)
        let right = Math.max(...lngs)


        let bounds = [
          [
            [north, west],
            [north, east],
            [south, east],
            [south, west]],
          [
            [top, left],
            [top, right],
            [bottom, right],
            [bottom, left]
          ]
        ]

        if (this.map.highlight) {
          this.map.highlight.setLatLngs(bounds)
        } else {
          this.map.highlight = L.polygon(bounds, {
            stroke: false,
            fillColor: "black",
            fillOpacity: .5,
          })
          this.map.highlight.addTo(this.map)
        }

      }



      this.map.on(
        "mousedown",
        ({latlng})=>{
          if (!this.map.cropStart && this.map.cropping) {
            this.map.cropStart = createMarker(latlng)
            this.map.cropStart.on("moveend", ({latlng}) => {
              highlightSelection()
              saveGeometryToState()

            })
            this.map.cropStart.on("drag", ({latlng}) => {
              highlightSelection()
            })
            this.map.cropStart.addTo(this.map)
          }
        }
      )

      this.map.on(
        "mousemove",
        ({latlng}) => {

          if (this.map.cropping && this.map.cropStart && this.map.cropEnd){
            this.map.cropEnd.setLatLng(latlng)
            this.map.cropEnd.setLatLng(latlng)
            highlightSelection()
          }else if (this.map.cropping && this.map.cropStart && !this.map.cropEnd) {
            this.map.cropEnd = createMarker(latlng)

            this.map.cropEnd.addTo(this.map)
            this.map.cropEnd.on("moveend", ({latlng}) => {
              highlightSelection()
              saveGeometryToState()
            })
            this.map.cropEnd.on("drag", ({latlng}) => {
              highlightSelection()
            })
          }
        }
      )

      this.map.on(
        "mouseup",
        ({latlng}) => {

          if (this.map.cropEnd && this.map.cropping) {
            this.map.cropEnd.setLatLng(latlng)
            saveGeometryToState()
            this.map.cropping = false
            this.map._container.style.cursor = ""
            this.map.dragging._draggable._enabled = true
            highlightSelection()
          }
        }
      )

      await this.promiseState( (prevState) => {
        return {
          cropperLoading: false,
          cropperCreated: true
        }
      })


    } catch (ex) {
      console.error(ex)
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
        zoomSnap: 0,
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
          return tile
        }
      })

      L.tileLayer.knight = function(...args){
        return new L.TileLayer.Knight(...args)
      }


      this.tiles = L.tileLayer.knight(
        `${s3Url}/${bucketId}/${imageId}/tiles/{z}-{x}-{y}.png`, {
          tileSize,
          maxNativeZoom: maxZoom,
          minNativeZoom: 0,
          noWrap: true,
          bounds,
          minZoom: initialZoom,
          maxZoom
        }
      )


      this.map.setView([height / 2, -1 * width / 2], initialZoom)

      this.map.on('zoomstart', (e) => {

        let zoomReq = e.target._zoom

        if (zoomReq < initialZoom) {
          e.target._zoom = initialZoom
        } else {
          e.target._zoom = Math.round(zoomReq)
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
  .crop-button {
    height: 30px;
    width: 30px;
    background: url("${url}/static/crop.png") center;
    background-size: cover;
    background-color: white;
    border: 1px solid ${({theme}) => theme.colors.lightMediumGray};
    box-shadow: 0 0 2px ${({theme}) => theme.colors.mediumGray};
    border-radius: 2px;
    &:active {
      background-color: grey;
    }
  }

`
