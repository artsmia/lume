import React, {Component} from 'react'
import styled from 'styled-components'
import query from '../../apollo/queries/content'
import mutation from '../../apollo/mutations/editContent'
import {compose} from 'react-apollo'
import {Input, Textarea, ChangeImage} from '../../components/cms/DefaultEditors'
import {Button} from '../../components/ui/buttons'

class PictureContentEditor extends Component {

  fields = [
    {
      label: "Title",
      name: "title",
      type: "string",
      Component: Input,
      default: ""
    },
    {
      label: "Description",
      name: "description",
      type: "string",
      Component: Textarea,
      default: ""
    },{
      label: "Image",
      name: "image0Id",
      parent: "image0",
      type: "image",
      Component: ChangeImage,
      default: undefined
    }
  ]

  state = {
    title: "",
    description: "",
    image0Id: undefined
  }

  render() {

    const {
      handleChange,
      saveEdits,
      fields,
      state
    } = this

    return (
      <Container>
        <Button
          onClick={saveEdits}
        >
          Save
        </Button>
        {fields.map( ({
          label,
          name,
          Component
        })=> (
          <Component
            key={name}
            label={label}
            name={name}
            value={state[name]}
            onChange={handleChange}
          />
        ))}
      </Container>
    )
  }

  componentWillReceiveProps(nextProps){
    this.updateProps(nextProps)
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  updateProps = (nextProps) => {
    if (nextProps.content) {
      if (
        nextProps.content.id !== this.state.id
      ) {
        let {content} = nextProps
        let state = {}

        this.fields.forEach(field => {
          if (field.type === "image") {
            let image = content[field.parent]
            Object.assign(state, {
              [field.name]: (image) ? image.id : field.default
            })
          } else {
            Object.assign(state, {
              [field.name]: content[field.name] || field.default
            })
          }
        })

        this.setState(state)
      }
    }
  }

  saveEdits = () => {
    this.props.editContent({
      ...this.state,
    })
  }



}

const Container = styled.div`

`

export default compose(query, mutation)(PictureContentEditor)
