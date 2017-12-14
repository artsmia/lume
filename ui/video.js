import react, {Component} from 'react'
import styled from 'styled-components'
const VimeoPlayer = (typeof window === "object") ? require('@vimeo/player') : null

export class Vimeo extends Component {

  static defaultProps = {
    url: ""
  }

  state = {
    vimeoId: ""
  }

  constructor(props){
    super(props)
    if (props.url.includes("vimeo.com/")) {
      let vimeoId = props.url.split("vimeo.com/")[1].substring(0,9)
      if (vimeoId.length === 9) {
        this.state = {
          vimeoId
        }
      }
    }
  }

  render(){
    const {
      vimeoId
    } = this.state

    if (vimeoId.length !== 9) return null

    return (
      <Container
        innerRef={ref => {this.container = ref}}
        id={"vimeo"}
      />
    )
  }

  componentDidMount(){
    const {
      state: {
        vimeoId
      },
      container
    } = this

    if (vimeoId) {
      const player = new VimeoPlayer(container, {
        id: vimeoId,
        width: container.clientWidth - 50
      })
    }
  }

  componentWillReceiveProps({url}){
    if (url !== this.props.url) {
      let vimeoId = ""
      if (url.includes("vimeo.com/")) {
        vimeoId = url.split("vimeo.com/")[1].substring(0,9)
        if (vimeoId.length !== 9) {
          vimeoId = ""
        }
      }
      this.setState({vimeoId})
    }
  }

  componentDidUpdate(){
    const {
      vimeoId
    } = this.state


    if (vimeoId) {
      const player = new VimeoPlayer('vimeo', {
        id: vimeoId,
        width: 500
      })
    }
  }

}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center
`
