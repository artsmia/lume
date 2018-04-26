import React, {Component} from 'react'
import {VideoUrl} from '../../cms/DefaultEditors'
import query from '../../../apollo/queries/content'
import mutation from '../../../apollo/mutations/editContent'
import {compose, withApollo} from 'react-apollo'
import styled from 'styled-components'
import {H2} from '../../mia-ui/text'
import {Row, Column} from '../../mia-ui/layout'
import setSaveStatus from '../../../apollo/local/setSaveStatus'
import {Flex, Box} from 'grid-styled'
import {Title, Description} from '../../mia-ui/forms'
import DeleteContentButton from '../../cms/DeleteContentButton'


class MovieEditor extends Component {

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

        <Box
          w={1}
          my={5}
        >
          <DeleteContentButton
            contentId={this.props.content.id}
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

  constructor(props){
    super(props)
    this.state = {
      title: "",
      description: "",
      videoUrl: ""
    }

    this.state = {
      ...this.stateFromProps(props)
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({...this.mapPropsToState(nextProps)})
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

      await this.props.editContent({
        ...this.state
      })

      await this.props.setSaveStatus({
        synced: true,
      })
    } catch (ex) {
      console.error(ex)
    }

  }

  stateFromProps = (props) => {
    if (
      !props.content ||
      props.contentId === this.state.id
    ) {
      return
    }
    let {
      content: {
        title,
        description,
        videoUrl
      }
    } = props

    return {
      title,
      description,
      videoUrl
    }
  }


}

let ExportComponent = MovieEditor

ExportComponent = compose(
  withApollo,
  query,
  mutation,
  setSaveStatus
)(ExportComponent)

export default ExportComponent
