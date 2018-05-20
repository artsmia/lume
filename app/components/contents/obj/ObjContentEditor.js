import react, { Component } from 'react'
import query from '../../../apollo/queries/content'
import mutation from '../../../apollo/mutations/editContent'
import { withRouter } from 'next/router'

import { compose, withApollo } from 'react-apollo'
import ObjEditor from '../../cms/ObjEditor'
import ObjSelector from '../../cms/ObjSelector'
import styled from 'styled-components'
import router from 'next/router'
import { Modal } from '../../mia-ui/modals'
import { Button } from '../../mia-ui/buttons'
import setSaveStatus from '../../../apollo/local/setSaveStatus'
import { Flex, Box } from 'grid-styled'
import { Title, Description } from '../../mia-ui/forms'
import DeleteContentButton from '../../cms/DeleteContentButton'

class ObjContentEditor extends Component {
  // state = {
  //   ...this.props.content,
  //   modal: false,
  //   objId: "",
  // }

  render() {
    if (!this.props.content) return null

    const {
      props: {
        content,
        content: { obj }
      },
      state: { modal, objId, description, title },
      handleSelect,
      handleChange,
      saveEdits
    } = this

    return (
      <Flex flexWrap={'wrap'} m={3}>
        <Box w={1}>
          <Title
            label={'Title'}
            value={title}
            name={'title'}
            onChange={handleChange}
          />
          <Description
            label={'Description'}
            value={description}
            name={'description'}
            onChange={handleChange}
          />
        </Box>

        <Box w={1 / 2} pr={3}>
          <ObjSelector
            onSelect={handleSelect}
            showDemo={this.state.showSelectorDemo && this.props.showDemo}
            onDemoFinish={this.handleObjSelectorFinish}
          />
        </Box>

        <Box w={1 / 2}>
          {obj ? (
            <ObjEditor
              objId={obj.id}
              showDemo={this.state.showEditorDemo && this.props.showDemo}
              onDemoFinish={this.handleObjEditorDemoFinish}
            />
          ) : null}
        </Box>

        <Box w={1} my={5}>
          <DeleteContentButton contentId={this.props.content.id} />
        </Box>
      </Flex>
    )
  }

  bounce = true

  handleObjSelectorFinish = () => {
    this.setState({
      showSelectorDemo: false,
      showEditorDemo: true
    })
  }

  handleObjEditorDemoFinish = () => {
    this.setState(
      () => ({
        showSelectorDemo: false,
        showEditorDemo: false
      }),
      this.props.onDemoFinish
    )
  }

  debounce = (func, wait) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(func, wait)
    }
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState(
      () => ({ [name]: value }),
      () => {
        this.props.setSaveStatus({ synced: false })
        this.debounce(this.saveEdits, 2000)
      }
    )
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.state = {
      ...this.stateFromProps(props),
      modal: false,
      objId: '',
      showSelectorDemo: false,
      showEditorDemo: false
    }
  }

  stateFromProps = props => {
    let state = {}

    if (props.contentId !== this.state.id) {
      Object.assign(state, { ...props.content })
    }

    if (props.content) {
      if (props.content.obj) {
        Object.assign(state, { objId: props.content.obj.id || '' })
      }
    }

    return state
  }

  componentWillReceiveProps(nextProps) {
    let nextState = this.stateFromProps(nextProps)

    this.setState({ ...this.stateFromProps(nextProps) })

    if (nextProps.showDemo) {
      Object.assign(nextState, { showSelectorDemo: true })
    }

    if (!nextProps.showDemo) {
      Object.assign(nextState, {
        showSelectorDemo: false,
        showEditorDemo: false
      })
    }
    this.setState({ ...nextState })
  }

  handleSelect = objId => {
    this.setState({
      objId
    })
    this.props.editContent({
      objId
    })
  }

  saveEdits = async () => {
    try {
      await this.props.editContent({
        id: this.state.id,
        description: this.state.description,
        title: this.state.title
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
ExportComponent = compose(query, mutation, setSaveStatus)(ExportComponent)

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
