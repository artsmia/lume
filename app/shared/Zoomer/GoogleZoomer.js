import {Component} from 'react'
import styled from 'styled-components'
import LeafletCss from './LeafletCss'
import {gdriveSearchUrl, googleApiKey, url} from '../../config'
import PropTypes from 'prop-types'
const L = (typeof window === 'object') ? require('leaflet') : null


export default class extends Component {

  static propTypes = {
    imageId: PropTypes.string,
    detailId: PropTypes.string,
    onCrop: PropTypes.func,
    crop: PropTypes.bool
  }

  static defaultProps = {
    crop: false,
    onCrop(geometry){console.log(geometry)}
  }

  state = {
    image: false,
    zoomCreated: false,
    zoomLoading: false,
    cropperLoading: false,
    cropperCreated: false,
    geometryLoading: false,
    geometryCreated: false,
    geometry: false
  }

  constructor(props){
    super(props)
    const {
      image,
      detail,
    } = props.data
    this.state = {
      ...this.state,
      image: (detail) ? detail.image : image,
      geometry: (detail) ? detail.geometry : false
    }
  }

  render() {
    if (this.props.data.loading || !this.state.image) return null

    return (
      <LeafletCss>
        <ZoomerMap
          innerRef={mapRef => this.mapRef = mapRef}
        />
      </LeafletCss>
    )
  }

  componentWillReceiveProps(nextProps){

    if (
      nextProps.data.detail &&
      this.props.data.detail
    ) {
      if (
        nextProps.data.detail.id !== this.props.data.detail.id
      ) {
        this.setState({
          geometry: nextProps.data.detail.geometry,
          geometryLoading: false,
          geometryCreated: false
        })
      }
    }
    if (
      !this.state.image &&
      !nextProps.data.loading
    ) {
      const {
        detail,
        image,
      } = nextProps.data
      this.setState({
        image: (detail) ? detail.image : image,
        geometry: (detail) ? detail.geometry: false
      })
    }
    if (
      this.state.image &&
      this.props.data.detail &&
      nextProps.data.detail
    ) {
      if (
        this.props.data.detail.image.id !== nextProps.data.detail.image.id
      ) {
        this.setState({
          image: nextProps.data.detail.image,
          zoomCreated: false,
          zoomLoading: false,
          cropperLoading: false,
          cropperCreated: false,
          geometryLoading: false,
          geometryCreated: false,
        })
      }
    }
    if (
      nextProps.data.image &&
      this.props.data.image
    ) {
      if (
        nextProps.data.image.id !==
        this.props.data.image.id
      ) {
        this.setState({
          image: nextProps.data.image,
          zoomCreated: false,
          zoomLoading: false,
          cropperLoading: false,
          cropperCreated: false,
          geometryLoading: false,
          geometryCreated: false,
        })
      }

    }
  }

  componentDidUpdate(){
    this.setup()
  }


  setup = async() => {
    try {

      if (
        !this.state.zoomLoading &&
        !this.state.zoomCreated &&
        !this.props.data.loading
      ) {
        await this.createZoomer()
      }

      if (
        this.state.zoomCreated &&
        this.props.crop &&
        !this.state.cropperLoading &&
        !this.state.cropperCreated
      ) {
        await this.createCropper()
      }

      if (
        this.state.zoomCreated &&
        this.state.geometry &&
        !this.state.geometryLoading &&
        !this.state.geometryCreated
      ) {
        await this.showCrop()
      }
    } catch (ex) {
      console.error(ex)
    }
  }


  get selectionBounds() {

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

    const top = Math.max(...lats)
    const bottom = Math.min(...lats)
    const left = Math.min(...lngs)
    const right = Math.max(...lngs)

    const selectionBounds = [
      [top, left],
      [top, right],
      [bottom, right],
      [bottom, left],
      [top, left]
    ]
    return selectionBounds
  }

  get outerBounds(){

    const {
      _northEast: {
        lat: north,
        lng: east
      },
      _southWest: {
        lat: south,
        lng: west
      }
    } = this.map.getBounds()
    const outerBounds = [
      [north, west],
      [north, east],
      [south, east],
      [south, west]
    ]
    return outerBounds
  }


  highlight = () => {

    const highlightBounds = [
      this.outerBounds,
      this.selectionBounds
    ]

    if (
      this.map.highlight
    ) {
      this.map.highlight.setLatLngs(highlightBounds)
    } else {
      this.map.highlight = L.polygon(highlightBounds, {
        stroke: false,
        fillColor: "black",
        fillOpacity: .8,
      })
      this.map.highlight.addTo(this.map)
    }
  }

  saveGeometry = () => {
    const geometry = {
      type: "Polygon",
      coordinates: [this.selectionBounds]

    }
    this.setState({geometry})
    this.props.onCrop(geometry)
  }


  showCrop = async () => {
    try {

      await this.promiseState({
        geometryLoading: true
      })

      this.highlight()


      await this.promiseState({
        geometryLoading: false,
        geometryCreated: true
      })

    } catch (ex) {
      console.error(ex)
    }
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
      iconUrl: `${url}/static/x.png`,
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

      await this.promiseState({
        cropperLoading: true
      })

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

      await this.promiseState({
        cropperLoading: false,
        cropperCreated: true
      })


    } catch (ex) {
      console.error(ex)
    }
  }


  createZoomer = async () => {
    try {

      await this.promiseState({
        zoomLoading: true
      })

      if (
        this.map
      ) {
        this.map.remove()
      }

      const {
        mapRef,
        state: {
          image: {
            gdriveId,
          }
        },
      } = this

      const response = await fetch(`${gdriveSearchUrl}&q='${gdriveId}' in parents and name contains 'original'&fields=files(id,name,imageMediaMetadata)`)

      const {files: [file]} = await response.json()

      let {
        height,
        width
      } = file.imageMediaMetadata

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
        attributionControl: false
      })

      const container = this.map.getContainer()

      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight

      const longDimension = Math.max(containerWidth, containerHeight)

      const initialZoom = Math.log2(longDimension / tileSize)

      const gdriveTiles = await this.getTiles()

      this.tiles = L.tileLayer.knight({
          tileSize,
          maxNativeZoom: maxZoom,
          minNativeZoom: 0,
          noWrap: true,
          bounds,
          minZoom: Math.floor(initialZoom),
          maxZoom,
          gdriveTiles
        }
      )

      this.map.setView(
        [height / 2, -1 * width / 2],
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

      await this.promiseState({
        zoomCreated: true
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

  getTiles = async() => {
    try {

      const {
        gdriveId
      } = this.state.image

      const dirResponse = await fetch(`${gdriveSearchUrl}&q='${gdriveId}' in parents and name='tiles'&fields=files(id,name)`)


      const {files: [tileDir]} = await dirResponse.json()


      const tilesResp = await fetch(`${gdriveSearchUrl}&q='${tileDir.id}' in parents&fields=files(id,name,webContentLink)&pageSize=1000`)

      const {files} = await tilesResp.json()

      return files

    } catch (ex) {
      console.error(ex)
    }
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

    initialize(options) {

      L.setOptions(this, options)

    },

    createTile({z,x,y}) {

      const {
        gdriveTiles
      } = this.options

      let tile = document.createElement("div")
      let image = document.createElement("img")

      const gdriveTile = gdriveTiles.find(
        tile => tile.name === `${z}-${x}-${y}.png`
      )

      if (!gdriveTile) {
        return tile
      }
      image.src = gdriveTile.webContentLink


      image.style["object-fit"] = "contain"
      tile.appendChild(image)
      return tile
    }
  })

  L.tileLayer.knight = function(...args){
    return new L.TileLayer.Knight(...args)
  }
}
