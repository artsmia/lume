import React, {Component} from 'react'
import styled from 'styled-components'
import MiaUI from '../../ui'
import Drawer from '../../ui/drawer'

export default class Template extends Component {

  static defaultProps = {
    drawer: true
  }


  render() {
    if (this.props.data.loading) {
      return null
    }
    const {
      props: {
        drawer
      }
    } = this
    return (
      <MiaUI>
        <Container>
          {(drawer) ? (
            <Drawer>
              <h2>Hello</h2>
            </Drawer>

          ) : null}


          {this.props.children}


        </Container>
      </MiaUI>
    )
  }



}


const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 80px 400px auto;
  padding: 0px 10px;
  box-sizing: border-box;
`

export const Centered = styled.div`
  grid-column: 3 / 10;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid ${({theme}) => theme.colors.lightMediumGray};
  padding: 20px;
`

export const ItemsContainer = styled.div`
  position: fixed;
  left: 300px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  padding: 20px;
  box-sizing: border-box;
`
