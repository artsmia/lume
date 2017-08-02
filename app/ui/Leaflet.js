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
    this.createLeaflet()

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

  createLeaflet = async () => {
    try {
      const {
        miaId: id
      } = this.props.item

      const response = await fetch(`https://tiles.dx.artsmia.org/${id}.json`)
      const {tileSize, height, width} = await response.json()

      this.map = L.map(this.refs.leaf)

      this.map.setView([width / 2, height / 2], 0)


      this.tileLayer = L.tileLayer(`https://{s}.tiles.dx.artsmia.org/{id}/{z}/{x}/{y}.png`, {
        id,
        tileSize: tileSize || 256
      })

      this.tileLayer.addTo(this.map)
    } catch (ex) {
      console.log(ex)
    }
  }
}
