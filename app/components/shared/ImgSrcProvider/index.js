import React, {Component} from 'react'
import fetch from 'isomorphic-unfetch'

export default function imgSrcProvider(WrappedComponent){


  return class ImgSrcProvider extends Component {

    state = {
      src: '/static/placeholder0.png'
    }

    componentDidMount(){
      this.generateSrcFromProps(this.props)
    }

    componentWillReceiveProps(nextProps){
      this.generateSrcFromProps(nextProps)
    }

    generateSrcFromProps = (props) => {
      try {
        let src = '/static/placeholder0.png'
        if (props.image && props.image.organization){

          const {
            image,
            image: {
              host,
              localId,
              organization,
              organization: {
                subdomain,
                id: orgId,
                customImageApiEnabled
              },

            },
            quality
          } = props

          let qual = quality || 'm'



          switch (true) {
            case (subdomain === 'local'): {
              src = `${process.env.LOCAL_TILE_URL}/static/${image.id}/${qual}.jpeg`
              break
            }
            case (host === 'mia'): {
              src = `https://cdn.dx.artsmia.org/thumbs/tn_${image.localId}.jpg`
              break
            }
            default: {
              src = `${process.env.S3_URL}/mia-lume/${image.id}/${qual}.png`
              break
            }
          }

        }

        // let resp = await fetch(src)
        //
        // if (resp.status !== 200){
        //   src = '/static/placeholder0.png'
        // }

        this.setState({src})
      } catch (ex) {
        console.error(ex)
      }

    }

    render(){
      return (
        <WrappedComponent
          {...this.props}
          src={this.state.src}
        />
      )
    }

  }

}
