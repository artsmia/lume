import React, {Component} from 'react'
import styled from 'styled-components'
import MiaUI from '../../ui'
import Drawer from '../../ui/drawer'

export default class Template extends Component {

  static defaultProps = {
    drawer: true
  }


  render() {

    const {
      props: {
        drawer
      }
    } = this
    return (
      <MiaUI>
        <Container>

          {this.props.children}


        </Container>
      </MiaUI>
    )
  }



}


const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 80px 400px auto;
  padding: 0px;
  box-sizing: border-box;
`

export const ItemsContainer = styled.div`
  grid-column: 4 / 12;
  grid-row: 1 / 4;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  padding: 20px;
  box-sizing: border-box;
`

export const SideContainer = styled.div`
  grid-column: 1 / 4;
  grid-row: 1 / 4;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
`

export const FeatureContainer = styled.div`
  grid-column: 4 / 13;
  grid-row: 1 / 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.gray};
  max-height: 100vh;
`
