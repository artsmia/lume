import React, {Component} from 'react'
import styled from 'styled-components'

export default class Edit extends Component {

  render(){

    const {
      props: {
        story
      }
    } = this

    console.log(story)

    return (
      <Container>

      </Container>
    )
  }

}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
