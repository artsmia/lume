import react, {Component} from 'react'
import query from '../../../apollo/queries/content'
import mutation from '../../../apollo/mutations/editContent'
import {compose} from 'react-apollo'
import ObjEditor from '../../cms/ObjEditor'
import ObjSelector from '../../cms/ObjSelector'
import styled from 'styled-components'
import router from 'next/router'
import Modal from '../../ui/modal'
import {Button} from '../../ui/buttons'
import {Textarea, Label} from '../../ui/forms'
import setSaveStatus from '../../../apollo/local/setSaveStatus'

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
        }
      },
      state: {
        modal,
        objId,
        description
      },
      handleModalOpen,
      handleModalClose,
      handleSelect,
      handleChange,
      saveEdits
    } = this

    return (
      <Container>

        <Label>
          Description
        </Label>
        <Textarea
          name={"description"}
          value={description}
          onChange={handleChange}
        />


        <Button
          onClick={handleModalOpen}
        >
          Select Obj
        </Button>

        <Modal
          open={modal}
          onClose={handleModalClose}
        >
          <ObjSelector
            subdomain={router.query.subdomain}
            onSelect={handleSelect}
          />
        </Modal>


        {(objId) ? (
          <ObjEditor
            objId={objId}
          />
        ): null}

      </Container>
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

  handleModalOpen = () => {
    this.setState({modal: true})
  }

  handleModalClose = () => {
    this.setState({modal: false})
  }

  handleSelect = (objId) => {
    this.setState({
      objId,
      modal: false
    })
    this.props.editContent({
      objId,
    })
  }

  saveEdits = async () => {
    try {

      this.props.setSaveStatus({
        saving: true
      })

      await this.props.editContent({
        id: this.state.id,
        description: this.state.description,
      })

      this.props.setSaveStatus({
        saving: false,
        lastSave: Date.now(),
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
