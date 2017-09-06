import react, {Component} from 'react'
import LeafletCss from './LeafletCss'
const L = (typeof window === 'object') ? require('./MuseumTileLayer') : null

export default class extends Component {

  render() {
    return (
      <LeafletCss
        innerRef={mapRef => this.mapRef = mapRef}
      />
    )
  }

  componentDidMount(){
    console.log(this.mapRef)
  }
}
