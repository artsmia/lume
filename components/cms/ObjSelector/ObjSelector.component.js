import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../ui/buttons'

export default class ObjSelector extends Component {

  render() {

    if (!this.props.objs) return null

    const {
      objs,
      createObj
    } = this.props

    return (
      <Container>
        <Button
          onClick={createObj}
        >
          Create Object
        </Button>
        {objs.map(obj => (
          <div
            key={obj.id}
          >
            {obj.id}
          </div>
        ))}
      </Container>
    )
  }
}

const Container = styled.div`

`
