import React, {Component} from 'react'
import styled from 'styled-components'
import {Row, Column} from '../../ui/layout'
import ImageModule from '../../ui/ImageModule'
import {Button} from '../../ui/buttons'
import {H4} from '../../ui/h'

export default class extends Component {
  render () {
    return (
      <Column>
        <DetailImg

        />
        <Button>
          Select Image
        </Button>

      </Column>
    )
  }
}


const DetailImg = styled.img`
  height: 200px;
  object-fit: contain;
`
