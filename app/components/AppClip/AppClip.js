import React, {Component} from 'react'
import styled from 'styled-components'
import {H4} from '../../ui/h'
import {Column} from '../../ui/layout'
import PropTypes from 'prop-types'

export default class AppClip extends Component {

  static propTypes = {
    selected: PropTypes.bool.isRequired,
    onClipSelection: PropTypes.func.isRequired,
    clipId: PropTypes.string.isRequired,
    data: PropTypes.object
  }


  render() {

    if (this.props.data.loading) return null

    const {
      props: {
        data: {
          clip,
          clip: {
            title,
            description
          }
        },
        selected,
        onClipSelection
      },
    } = this

    return (
      <Container
        selected={selected}
      >
        <Header
          onClick={() => onClipSelection(clip)}
        >
          <H4>
            {title}
          </H4>
        </Header>
        {(selected) ? (
          <Column>
            {description}
          </Column>
        ): null}


      </Container>
    )
  }


}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  border: 1px solid lightgrey;
  width: 100%;
  box-sizing: border-box;
  margin: 5px 0;
  padding: 10px;
  transition: .2s all;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;
`
