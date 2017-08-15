import React, {Component} from 'react'
import AppTemplate from '../AppTemplate/Template'
import {ItemsContainer} from '../AppTemplate/Template'
import {H2, H3} from '../../ui/h'
import {Button} from '../../ui/buttons'
import {Link} from '../../ui/links'
import {Column} from '../../ui/layout'
import styled from 'styled-components'

const TestImage = styled.div`
  display: flex;
  min-width: 250px;
  height: 200px;
  background-color: salmon;
  margin: 10px;
`

export default class AppHome extends Component {

  render() {

    if (this.props.data.loading) {
      return null
    }

    const {
      showLock,
      props,
      props: {
        data: {
          organization
        }
      }
    } = this
    const array = new Array(10).fill("Yo")
    return (
      <AppTemplate
        {...props}
        drawer={true}
      >
        <ItemsContainer>
          {array.map((item, index) => <TestImage key={index}/>)}
        </ItemsContainer>
      </AppTemplate>
    )
  }

}
