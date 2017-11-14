import React, {Component} from 'react'
import styled from 'styled-components'
import {H2} from '../../ui/h'

export default class Home extends Component {


  render() {
    if (this.props.data.loading) {
      return null
    }
    const {
      props: {
        data: {
          organization: {
            name
          }
        },
      }
    } = this
    return (
      <Container>
        <H2>
          {name}
        </H2>

        <div>
          Welcome to ArtStories!
        </div>

      </Container>
    )
  }

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px auto;
  width: 50%;
  align-items: flex-start;
  border: 1px solid black;
  min-height: 100vh;
  padding: 20px;
`
