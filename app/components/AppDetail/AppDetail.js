import React, {Component} from 'react'
import styled from 'styled-components'
import {H3} from '../../ui/h'
import {Column, Row} from '../../ui/layout'
import Image from '../Image'

export default class extends Component {

  static defaultProps = {
    selected: false,
    onDetailSelection(detail){console.log(detail)}
  }

  render() {

    if (this.props.data.loading) return null

    const {
      props: {
        data: {
          detail,
          detail: {
            id: detailId,
            title,
            index,
            description,
            image,
            additionalImages
          }
        },
        selected
      },
      handleSelection
    } = this

    return (
      <Container
        selected={selected}
      >
        <Header
          onClick={handleSelection}
        >
          <H3>
            {index + 1}
          </H3>
          <H3>
            {title}
          </H3>
        </Header>
        <p>
          {description}
        </p>
        <Row>
          {additionalImages.map( image => (
            <Image
              key={image.id}
              imageId={image.id}
            />
          ))}
        </Row>



      </Container>
    )
  }

  handleSelection = () => {
    const {
      onDetailSelection,
      data: {
        detail,
      }
    } = this.props

    onDetailSelection(detail)

  }

}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 10px;
  border: 1px solid lightgrey;
  transition: .2s all;

`

const Header = styled.div`
  display: flex;
  align-items: center;
`

const ClipsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px 10px 20px;
  width: 100%;
  box-sizing: border-box;
`
