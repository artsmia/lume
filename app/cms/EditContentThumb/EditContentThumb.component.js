import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {H3, H4} from '../../ui/h'
import {Spinner} from '../../ui/spinner'
import Image from '../../shared/Image'

export default class EditContentThumb extends Component {

  static defaultProps = {
    onSelect: PropTypes.func.isRequired,
    contentId: PropTypes.string.isRequired,

  }

  render() {

    if (!this.props.content) return (
      <Container>
        <Spinner/>
      </Container>
    )

    const {
      type,
      onSelect,
      contentId,
      content: {
        title
      }
    } = this.props

    return (
      <Container
        onClick={() => onSelect(contentId)}
      >
        <H3>
          {title}
        </H3>
        <H4>
          {type}
        </H4>
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
