import react, {Component} from 'react'
import query from '../../apollo/queries/content'
import mutation from '../../apollo/mutations/editContent'
import {compose} from 'react-apollo'
import ObjEditor from '../../components/cms/ObjEditor'
import styled from 'styled-components'

class ObjContentEditor extends Component {

  render(){

    if (!this.props.content) return null

    const {
      content: {
        obj
      }
    } = this.props

    return (
      <Container>
        object editor
        {(obj) ? (
          <ObjEditor
            objId={obj.id}
          />
        ): null}
      </Container>
    )
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
