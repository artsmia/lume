import React, {Component} from 'react'
import styled from 'styled-components'
import Template from '../Template/Template'
import {H1, H2, H3, H4} from '../../ui/h'
import Zoomer from '../Zoomer'
import {Column, Row} from '../../ui/layout'

export default class extends Component {


  render() {
    if (this.props.data.loading) return null

    const {
      props: {
        data: {
          book: {
            title,
            pages
          }
        }
      }
    } = this

    return (
      <Template
        drawer={false}
      >
        <Container>
          <BookHeader>
            <H3>
              {title}
            </H3>
          </BookHeader>
          <BookContainer>
            <FeatureContainer>

            </FeatureContainer>
            <SideContainer>

            </SideContainer>
          </BookContainer>
        </Container>


      </Template>
    )
  }


}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const BookHeader = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
`

const BookContainer = styled.div`
  display: flex;
  height: 100%;
`

const SideContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const FeatureContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
`
