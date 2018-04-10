import React, {Component} from 'react'
import {VideoUrl} from '../../cms/DefaultEditors'
import query from '../../../apollo/queries/content'
import mutation from '../../../apollo/mutations/editContent'
import {compose} from 'react-apollo'
import styled from 'styled-components'
import {H2} from '../../mia-ui/text'
import {Row, Column} from '../../mia-ui/layout'
import setSaveStatus from '../../../apollo/local/setSaveStatus'
import {Flex, Box} from 'grid-styled'
import {Title, Description} from '../../mia-ui/forms'

class MovieEditor extends Component {

  state = {
    title: "",
    description: "",
    videoUrl: ""
  }

  render(){

    if (!this.props.content) return null

    const {
      state: {
        title,
        description,
        videoUrl
      },
      saveEdits,
      handleChange,
    } = this

    return(
      <Flex
        flexWrap={'wrap'}
        m={3}
      >

        <Box
          w={1}
        >
          <Title
            label={"Title"}
            value={title}
            name={"title"}
            onChange={handleChange}
          />
        </Box>

        <Box
          w={1}
        >
          <Description
            label={"Description"}
            value={description}
            name={"description"}
            onChange={handleChange}
          />
        </Box>

        <Box
          w={1}
        >
          <VideoUrl
            label={"Video Url"}
            value={videoUrl}
            name={"videoUrl"}
            onChange={handleChange}
          />
        </Box>


      </Flex>
    )
  }

  bounce = true

  debounce = (func, wait) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(
        func,
        wait
      )
    }
  }

  componentWillReceiveProps(nextProps){
    this.mapPropsToState(nextProps)
  }

  handleChange = ({target: {value, name}}) => {
    this.props.setSaveStatus({
      synced: false
    })
    this.setState(
      ()=>({
        [name]: value,
      }),
      ()=>{
        this.debounce(this.saveEdits,2000)
      }
    )
  }

  saveEdits = async () => {
    try {
      await this.props.setSaveStatus({
        saving: true,
      })

      await this.props.editContent({
        ...this.state
      })

      await this.props.setSaveStatus({
        saving: false,
        synced: true,
        lastSave: Date.now()
      })
    } catch (ex) {
      console.error(ex)
    }

  }

  mapPropsToState = (nextProps) => {
    if (
      !nextProps.content ||
      nextProps.contentId === this.state.id
    ) {
      return
    }
    let {
      content: {
        title,
        description,
        videoUrl
      }
    } = nextProps

    this.setState({
      title,
      description,
      videoUrl
    })
  }


}

let ExportComponent = MovieEditor

ExportComponent = compose(query, mutation)(ExportComponent)
ExportComponent = compose(setSaveStatus)(ExportComponent)

export default ExportComponent
