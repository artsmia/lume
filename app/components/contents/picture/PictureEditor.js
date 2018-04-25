import React, {Component} from 'react'
import {ChangeImage} from '../../cms/DefaultEditors'
import query from '../../../apollo/queries/content'
import OrganizationQuery from '../../../apollo/queries/organization'
import {withRouter} from 'next/router'

import mutation from '../../../apollo/mutations/editContent'
import {compose} from 'react-apollo'
import styled from 'styled-components'
import {H2} from '../../mia-ui/text'
import {Row, Column} from '../../mia-ui/layout'
import setSaveStatus from '../../../apollo/local/setSaveStatus'
import {Flex, Box} from 'grid-styled'
import {Title, Description} from '../../mia-ui/forms'
import DeleteContentButton from '../../cms/DeleteContentButton'


class PictureEditor extends Component {

  state = {
    title: "",
    description: "",
    image0Id: "",
  }

  render(){

    if (!this.props.content) return null

    const {
      state: {
        title,
        description,
        image0Id,
      },
      saveEdits,
      handleChange,
      props: {
        organization,
        content
      }
    } = this

    return(
      <Flex
        w={[1, 1/2]}
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
            <ChangeImage
              label={"Image"}
              name={"image0Id"}
              image={content.image0}
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
      const {
        title,
        description,
        image0Id,
      } = this.state

      await this.props.editContent({
        title,
        description,
        image0Id: image0Id || undefined,
      })

      await this.props.setSaveStatus({
        synced: true,
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
      content,
      content: {
        image0,
      }
    } = nextProps

    this.setState({
      ...content,
      image0Id: image0 ? image0.id : "",
    })
  }


}

let ExportComponent = PictureEditor

ExportComponent = compose(query, mutation)(ExportComponent)
ExportComponent = compose(setSaveStatus)(ExportComponent)
ExportComponent = compose(OrganizationQuery)(ExportComponent)
ExportComponent = withRouter(ExportComponent)


export default ExportComponent
