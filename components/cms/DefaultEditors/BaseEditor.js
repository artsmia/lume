import React, {Component} from 'react'
import styled from 'styled-components'
import query from '../../../apollo/queries/content'
import mutation from '../../../apollo/mutations/editContent'
import {compose} from 'react-apollo'
import {Button} from '../../ui/buttons'

class BaseEditor extends Component {

  constructor(props){
    super(props)
    this.state = {
      sync: true,
    }
    this.props.fields.forEach(({name, defaultValue}) => Object.assign(this.state, {
      [name]: defaultValue
    }))
  }

  render() {

    const {
      handleChange,
      saveEdits,
      state,
      state: {
        sync
      },
      props: {
        fields
      }
    } = this

    return (
      <Container>
        <Button
          onClick={saveEdits}
          disabled={sync}
        >
          {(sync) ? "Saved!" : "Save"}
        </Button>
        {fields.map( ({
          label,
          name,
          Component,
          type
        })=> (
          <Component
            key={name}
            label={label}
            name={name}
            value={state[name]}
            onChange={handleChange}
            detailImageId={(type === "geometry") ? state.image0Id : undefined}
          />
        ))}
      </Container>
    )
  }

  componentWillReceiveProps(nextProps){
    this.updateProps(nextProps)
  }

  handleChange = ({target: {value, name}}) => {
    this.setState({
      [name]: value,
      sync: false
    })
  }

  updateProps = (nextProps) => {
    if (nextProps.content) {
      if (
        nextProps.content.id !== this.state.id
      ) {
        let {content} = nextProps
        let state = {
          sync: true
        }

        this.props.fields.forEach(field => {

          const {
            name,
            parent,
            defaultValue
          } = field


          switch (field.type) {
            case "image": {
              let image = content[parent]
              Object.assign(state, {
                [name]: (image) ? image.id : defaultValue
              })
              break
            }
            case "geometry": {
              Object.assign(state, {
                [name]: content[name] || defaultValue,
              })
              break
            }
            default:
            case "string": {
              Object.assign(state, {
                [name]: content[name] || defaultValue
              })
              break
            }
          }
        })

        this.setState(state)
      }
    }
  }

  saveEdits = () => {
    this.props.editContent({
      ...this.state,
      sync: undefined
    })
    this.setState({sync: true})
  }

  componentWillUnmount(){
    if (!this.state.sync) {
      this.saveEdits()
    }
  }


}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items: flex

`

export default compose(query, mutation)(BaseEditor)
