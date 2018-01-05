import react, {Component} from 'react'
import query from '../../apollo/queries/content'
import mutation from '../../apollo/mutations/editContent'
import {compose} from 'react-apollo'
import ObjEditor from '../../components/cms/ObjEditor'
import ObjSelector from '../../components/cms/ObjSelector'
import styled from 'styled-components'
import router from 'next/router'
import Modal from '../../components/ui/modal'
import {Button} from '../../components/ui/buttons'

class ObjContentEditor extends Component {

  state = {
    modal: false,
    objId: ""
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
        objId
      },
      handleModalOpen,
      handleModalClose,
      handleSelect,
      saveEdits
    } = this

    return (
      <Container>

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

  componentWillReceiveProps(nextProps){
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

  saveEdits = () => {

  }
}

export default compose(query, mutation)(ObjContentEditor)


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  overflow-y: scroll;
`
