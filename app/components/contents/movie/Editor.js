import React, {Component} from 'react'
import {Input, Textarea, VideoUrl} from '../../cms/DefaultEditors'
import query from '../../../apollo/queries/content'
import mutation from '../../../apollo/mutations/editContent'
import {compose} from 'react-apollo'
import styled from 'styled-components'
import {H2} from '../../ui/h'
import {Row, Column} from '../../ui/layout'
import setSaveStatus from '../../../apollo/local/setSaveStatus'

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
      <Container>
        <TopBar>

          <H2>
            Edit Movie
          </H2>

        </TopBar>
        <Row>
          <Column>
            <Input
              label={"Title"}
              value={title}
              name={"title"}
              onChange={handleChange}
            />
            <Textarea
              label={"Description"}
              value={description}
              name={"description"}
              onChange={handleChange}
            />
          </Column>
        </Row>
        <Row>
          <VideoUrl
            label={"Video Url"}
            value={videoUrl}
            name={"videoUrl"}
            onChange={handleChange}
          />
        </Row>

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

let ExportComponent = MovieEditor

ExportComponent = compose(query, mutation)(ExportComponent)
ExportComponent = compose(setSaveStatus)(ExportComponent)

export default ExportComponent
