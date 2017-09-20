import React, {Component} from 'react'
import styled from 'styled-components'

export default class OrgSettings extends Component {


  render() {

    if (this.props.data.loading) return null

    const {
      props
    } = this

    return (
      <Container>

      </Container>
    )
  }

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 50%;
  align-items: flex-start;
`
