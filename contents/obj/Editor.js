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
    modal: false
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
        modal
      },
      handleModalOpen,
      handleModalClose
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
          />
        </Modal>


        {(obj) ? (
          <ObjEditor
            objId={obj.id}
          />
        ): null}
      </Container>
    )
  }

  handleModalOpen = () => {
    this.setState({modal: true})
  }

  handleModalClose = () => {
    this.setState({modal: false})
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
