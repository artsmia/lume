
import React, {Component} from 'react'
import styled from 'styled-components'

export default class SnackBar extends Component {


  state = {
    show: false,
    message: "",
    snackIds: []
  }

  render() {
    const {
      state: {
        show,
        message
      },
    } = this
    return (
      <Container
        show={show}
      >
        {message}
      </Container>
    )
  }

  componentWillReceiveProps({message, snackId}){
    if (message && !this.state.snackIds.includes(snackId)) {
      this.activate(message, snackId)
    }
  }

  activate = (message, snackId) => {
    this.setState((prevState) => ({
      show: true,
      message,
      snackIds: [...prevState.snackIds, snackId]
    }))
    setTimeout( () => {
      this.setState({
        show: false,
        message: ""
      })
    }, 4000)
  }


}

const Container = styled.div`
  display: flex;
  opacity: ${({show}) => (show) ? '.9': '0'};
  border-radius: 5px;
  position: fixed;
  width: 300px;
  height: 50px;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) ${({show}) => (show) ? '': 'translateY(100%)'};;
  background-color:  ${({theme}) => theme.colors.purple};
  justify-content: center;
  align-items: center;
  color: ${({theme}) => theme.colors.white};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 20px;
  transition: all .4s;
`
