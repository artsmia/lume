import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../mia-ui/buttons'
import {Label} from '../../mia-ui/forms'
import Zoomer from '../../shared/Zoomer'
import {Flex, Box} from 'grid-styled'

export default class DetailSelector extends Component {

  state = {
    modal: false
  }

  render(){

    const {
      props: {
        value,
        label,
        detailImageId,
      },
      handleCrop,
      state: {
        modal
      }
    } = this
    return (
      <Flex
        flexWrap={'wrap'}
      >
        <Box
          w={1}
        >
          <Label>
            {label}
          </Label>
        </Box>
        <ZoomerBox
          w={1}
        >
          <Zoomer
            geometry={value}
            imageId={detailImageId}
            onCrop={handleCrop}
            crop={true}
          />
        </ZoomerBox>


      </Flex>
    )
  }

  handleCrop = (value) => {
    const {
      onChange,
      name
    } = this.props

    onChange({
      target: {
        value,
        name
      }
    })
  }

}

const ZoomerBox = styled(Box)`
  min-height: 500px;
`
