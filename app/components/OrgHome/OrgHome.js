import React, {Component} from 'react'
import styled from 'styled-components'
import {H1} from '../../ui/h'

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
        }
      }
    } = this
    return (
      <Container>
        <H1>
          {name}
        </H1>
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
`
