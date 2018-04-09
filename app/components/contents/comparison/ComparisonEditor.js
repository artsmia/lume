import React, {Component} from 'react'
import {ChangeImage} from '../../cms/DefaultEditors'
import query from '../../../apollo/queries/content'
import OrganizationQuery from '../../../apollo/queries/organization'
import {withRouter} from 'next/router'
import mutation from '../../../apollo/mutations/editContent'
import {compose} from 'react-apollo'
import styled from 'styled-components'
import {H2} from '../../mia-ui/text'
import setSaveStatus from '../../../apollo/local/setSaveStatus'
import getImageSrc from '../../../utils/getImageSrc'
import {Flex, Box} from 'grid-styled'
import {Title, Description} from '../../mia-ui/forms'

class ComparisonEditor extends Component {

  state = {
    title: "",
    description: "",
    image0Id: "",
    image1Id: "",
  }

  render(){

    if (!this.props.content) return null

    const {
      state: {
        title,
        description,
        image0Id,
        image1Id
      },
      saveEdits,
      handleChange,
      props: {
        content,
        organization
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
            src={getImageSrc({
              organization,
              image: content.image0,
              quality: 'm'
            })}
            onChange={handleChange}
          />
        </Box>
        <Box
          w={1}
        >
          <ChangeImage
            label={"Image"}
            name={"image1Id"}
            src={getImageSrc({
              organization,
              image: content.image1,
              quality: 'm'
            })}
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

      const {
        title,
        description,
        image0Id,
        image1Id
      } = this.state

      await this.props.editContent({
        title,
        description,
        image0Id: image0Id || undefined,
        image1Id: image1Id || undefined
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
      content,
      content: {
        image0,
        image1
      }
    } = nextProps

    this.setState({
      ...content,
      image0Id: image0 ? image0.id : "",
      image1Id: image1 ? image1.id : ""
    })
  }


}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items: flex-start;
  overflow-y:scroll;
  padding: 15px;
  box-sizing:border-box;
`

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: space-between;
`

let ExportComponent = ComparisonEditor

ExportComponent = compose(query, mutation)(ExportComponent)
ExportComponent = compose(setSaveStatus)(ExportComponent)
ExportComponent = compose(OrganizationQuery)(ExportComponent)
ExportComponent = withRouter(ExportComponent)


export default ExportComponent
