import react, {Component} from 'react'
import query from '../../../apollo/queries/content'
import mutation from '../../../apollo/mutations/editContent'
import OrganizationQuery from '../../../apollo/queries/organization'
import {withRouter} from 'next/router'

import {compose} from 'react-apollo'
import ObjEditor from '../../cms/ObjEditor'
import ObjSelector from '../../cms/ObjSelector'
import styled from 'styled-components'
import router from 'next/router'
import {Modal} from '../../mia-ui/modals'
import {Button} from '../../mia-ui/buttons'
import setSaveStatus from '../../../apollo/local/setSaveStatus'
import {Flex, Box} from 'grid-styled'
import {Title, Description} from '../../mia-ui/forms'

class ObjContentEditor extends Component {

  state = {
    ...this.props.content,
    modal: false,
    objId: "",
  }

  render(){

    if (!this.props.content) return null

    const {
      props: {
        content: {
          obj
        },
        organization
      },
      state: {
        modal,
        objId,
        description
      },
      handleSelect,
      handleChange,
      saveEdits
    } = this

    return (
      <Flex
        flexWrap={'wrap'}
        m={3}
      >
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
          w={1/2}
          pr={3}
        >

          <ObjSelector
            subdomain={router.query.subdomain}
            onSelect={handleSelect}
          />
        </Box>


        <Box
          w={1/2}
        >
          {(objId) ? (
            <ObjEditor
              objId={objId}
              organization={organization}
            />
          ): null}
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

  handleChange = ({target: {value, name}}) => {
    this.setState(
      ()=>({[name]: value}),
      ()=>{
        this.props.setSaveStatus({synced: false})
        this.debounce(this.saveEdits,2000)
      }
    )
  }

  componentWillReceiveProps(nextProps){

    if (nextProps.contentId !== this.state.id){
      this.setState({...nextProps.content})
    }

    if (
      nextProps.content
    ) {
      if (nextProps.content.obj) {
        this.setState({objId: nextProps.content.obj.id || ""})
      }
    }
  }

  handleSelect = (objId) => {
    this.setState({
      objId,
    })
    this.props.editContent({
      objId,
    })
  }

  saveEdits = async () => {
    try {


      await this.props.editContent({
        id: this.state.id,
        description: this.state.description,
      })

      this.props.setSaveStatus({
        synced: true
      })
    } catch (ex) {
      console.error(ex)
    }
  }
}

let ExportComponent = ObjContentEditor
ExportComponent = compose(query, mutation)(ExportComponent)
ExportComponent = compose(setSaveStatus)(ExportComponent)
ExportComponent = compose(OrganizationQuery)(ExportComponent)
ExportComponent = withRouter(ExportComponent)

export default ExportComponent


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  overflow-y: scroll;
  padding: 15px;
  box-sizing: border-box;
`
