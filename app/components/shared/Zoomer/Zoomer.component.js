import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
const L = (typeof window === 'object') ? require('leaflet') : null


export default class extends Component {

  // static propTypes = {
  //   imageId: PropTypes.string,
  //   detailId: PropTypes.string,
  //   onCrop: PropTypes.func,
  //   crop: PropTypes.bool
  // }

  static defaultProps = {
    crop: false,
    onCrop(geometry){console.log(geometry)}
  }

  constructor(props){
    super(props)
    const {
      image,
      detail,
    } = props
      this.state = {
      ...this.state,
      image: (detail) ? detail.image : image,
      geometry: (detail) ? detail.geometry : false
    }
  }

  render() {
    if (this.props.loading || !this.state.image) return null

    return (
      <ZoomerMap
        innerRef={mapRef => this.mapRef = mapRef}
      />
    )
  }

  componentWillReceiveProps(nextProps){

    if (
      nextProps.geometry &&
      this.props.geometry
    ) {
      this.setState({
        geometry: nextProps.geometry,
      })
      this.geometryLoading = false
      this.geometryCreated = false
    }
    if (
      !this.state.image &&
      !nextProps.loading
    ) {
      const {
        image,
      } = nextProps

      let displayImage

      this.setState({
        image,
      })
    }

    if (
      !nextProps.loading &&
      nextProps.geometry
    ) {
      this.setState({geometry: nextProps.geometry})
    }

    if (
      this.state.image &&
      this.props.image &&
      nextProps.image
    ) {
      if (
        this.props.image.id !== nextProps.image.id
      ) {
        this.setState({
          image: nextProps.image,
        })
        this.zoomCreated = false
        this.zoomLoading = false
        this.cropperLoading = false
        this.cropperCreated = false
        this.geometryLoading = false
        this.geometryCreated = false
      }
    }
    if (
      nextProps.image &&
      this.props.image
    ) {
      if (
        nextProps.image.id !==
        this.props.image.id
      ) {
        this.setState({
          image: nextProps.image,
        })
        this.zoomCreated = false
        this.zoomLoading = false
        this.cropperLoading = false
        this.cropperCreated = false
        this.geometryLoading = false
        this.geometryCreated = false
      }

    }
  }

  componentDidUpdate(){
    this.setup()
  }


  setup = async() => {
    try {
      if (
        !this.zoomLoading &&
        !this.zoomCreated &&
        this.props.image
      ) {
        await this.createZoomer()
      }

      if (
        this.zoomCreated &&
        this.props.crop &&
        !this.cropperLoading &&
        !this.cropperCreated
      ) {
        await this.createCropper()
      }

      if (
        this.zoomCreated &&
        this.state.geometry &&
        !this.geometryLoading &&
        !this.geometryCreated
      ) {
        await this.showCrop()
      }

      if (
        this.zoomCreated &&
        !this.props.loading &&
        this.props.moreGeometry
      ) {
        await this.createIndexMarkers()
      }

      if (
        this.zoomCreated &&
        !this.props.moreGeometry &&
        this.indexMarkers.length > 0
      ) {
        this.indexMarkers.forEach(marker => {
          this.map.removeLayer(marker)
        })
      }

    } catch (ex) {
      console.error(ex)
    }
  }


  getSelectionBounds() {

    let lats = []
    let lngs = []

    const {
      cropStart,
      cropEnd
    } = this.map

    if (
      cropStart &&
      cropEnd
    ) {
      lats = [
        cropStart._latlng.lat,
        cropEnd._latlng.lat
      ]
      lngs = [
        cropStart._latlng.lng,
        cropEnd._latlng.lng
      ]
    } else {
      const [
        coordinates
      ] = this.state.geometry.coordinates

      lats = coordinates.map(([lat,lng]) => lat)
      lngs = coordinates.map(([lat,lng]) => lng)
    }



    let top = Math.max(...lats)
    let bottom = Math.min(...lats)
    let left = Math.min(...lngs)
    let right = Math.max(...lngs)



    const selectionBounds = [
      [top, left],
      [top, right],
      [bottom, right],
      [bottom, left],
      [top, left]
    ]

    return selectionBounds
  }

  getOuterBounds(){

    const {
      _northEast: {
        lat: north,
        lng: east
      },
      _southWest: {
        lat: south,
        lng: west
      }
    } = this.bounds

    const outerBounds = [
      [north, west],
      [north, east],
      [south, east],
      [south, west],
      [north, west],
    ]


    return outerBounds
  }


  highlight = () => {

    const highlightBounds = [
      this.getOuterBounds(),
      this.getSelectionBounds()
    ]



    if (this.currentHighlight) {
      this.currentHighlight.removeFrom(this.map)
    }
    this.highlightPolygon = L.polygon(highlightBounds, {
      stroke: false,
      fillColor: "black",
      fillOpacity: .8,
    })
    this.currentHighlight = this.highlightPolygon.addTo(this.map)


  }

  indexMarkers = []

  createIndexMarkers = () => {
    const {
      props: {
        moreGeometry,
        onContentSelection
      },
    } = this

    moreGeometry.forEach( (content) => {

      const {
        index,
        geometry: {coordinates}
      } = content

      let southWest = L.polygon(coordinates).getBounds().getSouthWest()

      let html = `<div class="index-icon"> ${index} </div>`

      let icon = L.divIcon({
        html
      })

      let indexMarker = L.marker(southWest, {
        icon,
        opacity: .75
      })

      indexMarker.addTo(this.map)

      this.indexMarkers.push(indexMarker)

      indexMarker.on(
        "click",
        () => {
          onContentSelection(content)
        }
      )


    })

  }


  saveGeometry = () => {
    const geometry = {
      type: "Polygon",
      coordinates: [this.getSelectionBounds()],
      __typename: undefined

    }
    this.setState({
      ...geometry,
    })
    this.props.onCrop(geometry)
  }


  showCrop = async () => {
    try {
      this.geometryLoading = true



      this.highlight()

      if (this.props.zoom){
        this.map.flyToBounds(this.getSelectionBounds(),{
          padding: [80,80]
        })
      }



      this.geometryLoading = false
      this.geometryCreated = true



    } catch (ex) {
      console.error(ex)
    }
  }

  zoomIn = () => {
    this.map.flyToBounds(this.getSelectionBounds())
  }


  handleMouseDown = ({latlng}) => {
    if (
      !this.map.cropStart &&
      this.map.cropping
    ) {

      this.map.cropStart = this.createMarker(latlng)

      this.map.cropStart.on(
        "moveend",
        this.handleCropEnd
      )

      this.map.cropStart.on(
        "drag",
        this.highlight
      )

      this.map.cropStart.addTo(this.map)
    }
  }

  handleMouseMove = ({latlng}) => {

    if (
      this.map.cropping &&
      this.map.cropStart &&
      this.map.cropEnd
    ){

      this.map.cropEnd.setLatLng(latlng)
      this.map.cropEnd.setLatLng(latlng)
      this.highlight()

    } else if (
      this.map.cropping &&
      this.map.cropStart &&
      !this.map.cropEnd
    ) {

      this.map.cropEnd = this.createMarker(latlng)

      this.map.cropEnd.addTo(this.map)

      this.map.cropEnd.on(
        "moveend",
        this.handleCropEnd
      )

      this.map.cropEnd.on(
        "drag",
        this.highlight
      )
    }
  }

  handleMouseUp =({latlng}) => {

    if (
      this.map.cropEnd &&
      this.map.cropping
    ) {

      this.map.cropEnd.setLatLng(latlng)

      this.map.cropping = false
      this.map._container.style.cursor = ""
      this.map.dragging._draggable._enabled = true

      this.handleCropEnd()
    }
  }

  handleCropEnd = () => {
    this.highlight()
    this.saveGeometry()
  }


  get cropIcon() {
    return L.icon({
      iconUrl: `/static/x.png`,
      iconSize: 30,
      iconAnchor: [15,15]
    })
  }

  createMarker = (latlng) => {
    return L.marker(latlng, {
      icon: this.cropIcon,
      draggable: true
    })
  }

  createCropper = async () => {
    try {

      this.cropperLoading = true

      L.control.cropper({
        position: "bottomleft"
      }).addTo(this.map)


      this.map.on(
        "mousedown",
        this.handleMouseDown
      )

      this.map.on(
        "mousemove",
        this.handleMouseMove
      )

      this.map.on(
        "mouseup",
        this.handleMouseUp
      )

      this.cropperLoading = false,
      this.cropperCreated = true


    } catch (ex) {
      console.error(ex)
    }
  }


  createZoomer = async () => {
    try {


      this.zoomLoading = true

      if (
        this.map
      ) {
        this.map.remove()
      }

      const {
        mapRef,
        state: {
          image: {
            id: imageId,
            localId,
            organization: {
              id: bucketId,
              customImageApiEnabled
            }
          }
        },
      } = this


      let tileSize
      let tileUrl
      let height
      let width


      if (
        customImageApiEnabled &&
        localId
      ) {

        const response = await fetch(`https://tiles.dx.artsmia.org/${localId}.tif`, {
          method: "GET"
        })
        let json = await response.json()

        height = json.height
        width = json.width

        tileUrl = json.tileUrl || json.tiles[0]

        tileSize = json.tileSize || 256

      } else {

        tileSize = 512


        if (process.env.FILE_STORAGE === "local") {

          const response = await fetch(`${process.env.API_URL}/static/${imageId}/ImageProperties.xml`, {
            method: "GET"
          })

          let text = await response.text()

          height = new RegExp(/HEIGHT="(\d*)"/g).exec(text)[1]
          width = new RegExp(/WIDTH="(\d*)"/g).exec(text)[1]


          tileUrl = `${process.env.API_URL}/static/${imageId}/TileGroup0/{z}-{x}-{y}.png`
        } else {

          const response = await fetch(`${process.env.S3_URL}/mia-lume/${bucketId}/${imageId}/info.json`, {
            method: "GET"
          })

          let json = await response.json()

          height = json.height
          width = json.width

          tileUrl = `${process.env.S3_URL}/mia-lume/${bucketId}/${imageId}/{z}_{x}_{y}.png`


        }

      }

      const larger = Math.max(height, width)

      let maxTiles = Math.ceil(larger / tileSize)

      let maxZoom = Math.ceil(Math.log2(maxTiles))



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

      this.bounds = bounds

      this.map = L.map(mapRef, {
        crs: L.CRS.Simple,
        maxBounds: bounds,
        //zoomSnap: 0,
        attributionControl: false,
        maxZoom
      })

      const container = this.map.getContainer()

      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight

      const longDimension = Math.max(containerWidth, containerHeight)

      const initialZoom = Math.log2(longDimension / tileSize)

      this.tiles = L.tileLayer.knight(
        tileUrl, {
          tileSize,
          maxNativeZoom: maxZoom,
          minNativeZoom: 0,
          noWrap: true,
          bounds,
          minZoom: Math.floor(initialZoom),
          maxZoom
        }
      )

      let initialLatLng = [height / 2, -1 * width / 2]

      this.map.setView(
        initialLatLng,
        initialZoom
      )

      this.map.on('zoomstart', (e) => {

        let zoomReq = e.target._zoom

        if (
          zoomReq < initialZoom
        ) {
          e.target._zoom = initialZoom
        } else {
          e.target._zoom = Math.round(zoomReq)
        }

      })


      this.tiles.addTo(this.map)

      this.map.invalidateSize()

      this.map.fitBounds(bounds)

      this.zoomCreated = true


    } catch (ex) {
      console.error(ex)
    }
  }



}

const ZoomerMap = styled.div`
  height: 100%;
  width: 100%;
  display: block;
  .crop-button {
    height: 30px;
    width: 30px;
    background: url("/static/crop.png") center;
    background-size: cover;
    background-color: white;
    border: 1px solid ${({theme}) => theme.color.gray30};
    box-shadow: 0 0 2px ${({theme}) => theme.color.gray60};
    border-radius: 2px;
    &:active {
      background-color: grey;
    }
  }
  .index-icon {
    height: 35px;
    width: 35px;
    color: white;
    background-color: black;
    border-radius: 20px;
    border: 2px solid white;
    font-size: 20px;
    text-align: center;
    line-height: 35px;
  }

  .leaflet-div-icon {
    background-color: rgba(0,0,0,0);
    border: none;

  }

`
if (typeof window === 'object') {

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
        (e) => this.cropButtonClick(e, map)
      )

      return this.button
    },

    cropButtonClick(e, map){

      if (
        map.highlight
      ) {
        map.highlight.remove()
        map.highlight = false
      }
      if (
        map.cropStart
      ) {
        map.cropStart.remove()
        map.cropStart = false
      }

      if (
        map.cropEnd
      ) {
        map.cropEnd.remove()
        map.cropEnd = false
      }

      if (map.cropping === false) {
        map.cropping = true
        map._container.style.cursor = "crosshair"
        map.dragging._draggable._enabled = false
      }
    }
  })

  L.control.cropper = function(...args){
    return new L.Control.Cropper(...args)
  }

  L.TileLayer.Knight = L.TileLayer.extend({
      createTile({z,x,y}) {

        let tile = document.createElement("div")
        let image = document.createElement("img")
        image.src = this._url.replace("{z}",z).replace("{x}", x).replace("{y}", y).replace("{s}", 0)
        image.style["object-fit"] = "contain"
        tile.appendChild(image)
        return tile
      }
  })

  L.tileLayer.knight = function(...args){
    return new L.TileLayer.Knight(...args)
  }
}
