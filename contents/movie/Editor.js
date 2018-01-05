import React, {Component} from 'react'
import styled from 'styled-components'
import query from '../../apollo/queries/content'
import mutation from '../../apollo/mutations/editContent'
import {compose} from 'react-apollo'

class MovieContentEditor extends Component {

  render() {
    return (
      <Container>
        movie
      </Container>
    )
  }
}

const Container = styled.div`

`

export default compose(query, mutation)(MovieContentEditor)
