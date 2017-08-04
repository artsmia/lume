import React, {Component} from 'react'
import styled from 'styled-components'
import LeafletStyles from './LeafletStyles'
import fetch from 'isomorphic-fetch'
const L = (typeof window !== 'undefined') ? require('leaflet') : {}


export default class Leaflet extends Component {

  state = {
    height: "400px",
    width: "400px"
  }

  render() {
    const {
      height,
      width
    } = this.state
    return (
      <LeafletStyles>
        <div
          style={{
            height,
            width
          }}
          ref="leaf"
        />
      </LeafletStyles>
    )
  }

  componentDidMount(){
    this.setLeafDimensions()
    this.museumTiler()
  }


  setLeafDimensions = () => {
    const {
      leaf
    } = this.refs
    const parent = leaf.parentElement
    this.setState({
      height: parent.offsetHeight,
      width: parent.offsetWidth
    })

  }

  museumTiler = async () => {
    try {
      const {
        miaId: id
      } = this.props.item
      const response = await fetch(`https://tiles.dx.artsmia.org/${id}.json`)
      const json = await response.json()
      console.log(json)
      const {tileSize, height, width} = json
      var L = require('../utils/museumTileLayer')

      this.map = L.map(this.refs.leaf, {
        crs: L.CRS.Simple,
        zoomControl: false
      })
      this.map.setView([width / 2, height / 2], 0)

      this.tiles = L.museumTileLayer(`https://{s}.tiles.dx.artsmia.org/{id}/{z}/{x}/{y}.png`, {
        id,
        width,
        height,
        tileSize: tileSize || 256,
        minZoom: 1
      })
      this.tiles.addTo(this.map)
    } catch (ex) {
      console.error(ex)
    }

  }

}
