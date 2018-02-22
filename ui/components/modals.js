import React, {Component} from 'react'
import styled from 'styled-components'
import {
  gray85
} from '../theme/colors'
import {Button} from './buttons'
import {Box, Flex} from 'grid-styled'
import {Icon} from './icons'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${gray85};
  display: ${({open}) => open ? 'block': 'none'};
`

const ModalBox = styled.div`
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 5px;
`

const CloseButton = styled.button`
  position: absolute;
  right: -20px;
  top: -20px;
  background-color: transparent;
  border: 0;
  height: 30px;
  width: 30px;
  border-radius: 30px;
  text-align: center;
  vertical-align: center;
  cursor: pointer;
`

class Modal extends Component {

  render(){
    return (
      <Container
        onClick={this.props.onClose}
        open={this.props.open}
      >
        <ModalBox
          onClick={this.stopPropagation}
        >
          <CloseButton
            onClick={this.props.onClose}
          >
            <Icon
              size={'25px'}
              color={'white'}
              children={'close'}
            />
          </CloseButton>
          {this.props.children}
        </ModalBox>
      </Container>
    )
  }

  // escapeKey = (e) => {
  //   console.log(e)
  //   if (e.keyCode === 27) {
  //     this.setState({open: false})
  //   }
  // }

  stopPropagation = (e) => e.stopPropagation()


}

class Warn extends Component {

  static defaultProps = {
    onConfirm(){
      console.log("Confirmed")
    },
    onReject(){
      console.log("Rejected")
    }
  }

  render(){
    return (
      <Container
        open={this.props.open}
      >
        <ModalBox>
          <Flex
            flexDirection={'column'}
            w={'200px'}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
          >
            {this.props.children}

            <Flex
              flexDirection={'row'}
              justifyContent={'flex-end'}
            >
              <Button
                onClick={this.handleConfirm}
              >
                Yes
              </Button>
              <Button
                onClick={this.handleReject}
              >
                No
              </Button>
            </Flex>
          </Flex>

        </ModalBox>
      </Container>
    )
  }

  handleConfirm = () => {
    this.props.onConfirm()
    this.props.onClose()
  }

  handleReject = () => {
    this.props.onReject()
    this.props.onClose()
  }
}
export {
  Modal,
  Warn
}
