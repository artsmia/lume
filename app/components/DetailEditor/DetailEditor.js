import React, {Component} from 'react'
import styled from 'styled-components'
import {Row, Column} from '../../ui/layout'
import ImageModule from '../../ui/ImageModule'
import {Button} from '../../ui/buttons'

export default class extends Component {
  render () {
    console.log(this.props.detail)
    return (
      <Column>
        {this.props.detail.id}
      </Column>
    )
  }
}


const DetailImg = styled.img`
  height: 200px;
  object-fit: contain;
`
