import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {H3} from '../../ui/h'
import {Spinner} from '../../ui/spinner'
import Image from '../../shared/Image'

export default class EditContentThumb extends Component {

  static defaultProps = {
    onSelect: PropTypes.func.isRequired,
    contentId: PropTypes.string.isRequired,

  }

  render() {


    const {
      type,
      onSelect,
      contentId
    } = this.props

    return (
      <Container
        onClick={() => onSelect(contentId)}
      >
        <H3>
          {type}
        </H3>
      </Container>
    )
  }


}

const Container = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid blue;
  margin: 10px 0;
`
