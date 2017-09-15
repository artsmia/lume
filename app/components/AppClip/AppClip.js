import React, {Component} from 'react'
import styled from 'styled-components'
import {H4} from '../../ui/h'
import {Column, Row} from '../../ui/layout'
import Image from '../Image'

export default class extends Component {

  static defaultProps = {
    selected: false,
    onSelection(clip){console.log(clip)}
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
      <Container>
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
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;

`
