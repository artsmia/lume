import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  gray85
} from './colors'
import {Button} from './buttons'
import {Box, Flex} from 'grid-styled'
import {Icon} from './icons'
import {Span} from './text'


const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${gray85};
  display: ${({open}) => open ? 'block': 'none'};
  z-index: 2000;
`

const ModalBox = styled.div`
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 5px;
  padding: 10px;
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

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  }


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
              icon={'close'}
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

const WarnFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  width: 200px;
`


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

          <Span>
            {this.props.children}
          </Span>


          <WarnFooter>
            <Button
              onClick={this.handleConfirm}
            >
              Yes
            </Button>
            <Button
              onClick={this.handleReject}
              color={'red'}
            >
              No
            </Button>
          </WarnFooter>


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
