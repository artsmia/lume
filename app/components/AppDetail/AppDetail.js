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
        onClick={handleSelection}
      >
        <Header
        >
          <Index>
            {index + 1}
          </Index>
          <H3>
            {(title) ? title : "Detail"}
          </H3>
        </Header>

        {(selected) ? (
          <More>
            <Description>
              {description}
            </Description>
            <Row>
              {additionalImages.map( image => (
                <Image
                  key={image.id}
                  imageId={image.id}
                />
              ))}
            </Row>
          </More>
        ): null}




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
  align-items: stretch;
  margin: 10px;
  border: 1px solid lightgrey;
  transition: .2s all;
  cursor: pointer;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
`
const Index = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 40px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${({theme}) => theme.fonts.black};
  font-size: 25px;
  margin: 0 10px;
`

const More = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Description = styled.p`
  margin: 0;
`
