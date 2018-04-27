import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../mia-ui/buttons'
import {Label} from '../../mia-ui/forms'
import {Modal} from '../../mia-ui/modals'
import MediaManager from '../MediaManager'
import router from 'next/router'
import {Flex, Box} from 'grid-styled'
import {Icon} from '../../mia-ui/icons'

export default class MultiMedia extends Component {

  state = {
    modal: false
  }


  render(){

    const {
      handleModalOpen,
      handleModalClose,
      props: {
        additionalMedias,
        label,
        onRemove,
        organization
      },
      handleAdd,
      state: {
        modal,
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

        <Flex
          w={1}
        >
          {additionalMedias.map( media => (
            <Flex
              key={media.id}
              flexDirection={'column'}
              mr={1}
            >
              <MediaContainer
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Icon
                  icon={(media.format === 'mp4') ? 'local_movies' : 'volume_up'}
                  size={'70px'}
                />
                <TitleOverlay>
                  {media.title}
                </TitleOverlay>
              </MediaContainer>

              <Button
                color={"red"}
                onClick={()=>onRemove(media.id)}
              >
                Remove
              </Button>
            </Flex>
          ))}
        </Flex>

        <Box
          w={1}
        >
          <Button
            onClick={handleModalOpen}
          >
            Add
          </Button>
        </Box>


        <Modal
          open={modal}
          onClose={handleModalClose}
          header={`Edit Image`}
          width={"60%"}

        >
          <MediaManager
            onMediaSave={handleAdd}

          />

        </Modal>
      </Flex>
    )
  }


  handleModalOpen = () => {
    this.setState({
      modal: true
    })
  }

  handleModalClose = () => {
    this.setState({
      modal: false
    })
  }

  handleAdd = (mediaId) => {
    const {
      onAdd,
    } = this.props

    onAdd(mediaId)
    this.setState({modal: false})
  }


}

const MediaContainer = styled(Flex)`
  height: 150px;
  width: 150px;
  border: 1px solid black;
  position: relative;
`

const TitleOverlay = styled(Box)`
  background-color: ${({theme}) => theme.color.gray60};
  color: white;
  position: absolute;
  bottom: 0;
  height: 40%;
  font-size: 20px;
`
