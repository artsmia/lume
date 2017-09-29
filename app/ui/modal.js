import React, {Component} from 'react'
import styled from 'styled-components'

export default class Modal extends Component {

  static defaultProps = {
    open: false
  }

  render() {

    const {
      close,
      stopPropagation,
      escapeKey,
      props: {
        children,
        header,
        footer,
        open,
        width
      }
    } = this


    if (!open) return null

    return (
      <Overlay
        open={open}
        onClick={close}
      >
        <Container
          onClick={stopPropagation}
          width={width}
        >
          <Close
            onClick={close}
            aria-label={"Close"}
            onKeyUp={escapeKey}
            innerRef={ref => {this.closeButton = ref}}
          />

          {(header) ? (
            <Header>
              {header}
            </Header>
          ): null}

          <Body>
            {children}
          </Body>
          <Footer>
            {footer}
          </Footer>
        </Container>
      </Overlay>
    )
  }

  close = () => {
    this.props.onClose()
  }

  stopPropagation = (e) => e.stopPropagation()

  escapeKey = (e) => {
    if (e.keyCode === 27) {
      this.setState({open: false})
    }
  }

}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${({theme}) => theme.colors.darkGray};
  z-index: 1001;
`

const Container = styled.div`
  display: flex;
  position: fixed;
  max-height: 80vh;
  min-height: 30vh;
  min-width: 300px;
  max-width: 90%;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: ${({theme}) => theme.colors.white};
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 5px;
  z-index: 1002;
  width: ${({width}) => (width) ? width : ''};
`

const Header = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${({theme}) => theme.colors.lightMediumGray};
  height: 50px;
  align-items: center;
  padding: 10px;
  z-index: 3;
  box-sizing: border-box;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 10px;
  min-height: 50px;
  overflow-y: scroll;
  z-index: 3;
  box-sizing: border-box;
`

const Footer = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid ${({theme}) => theme.colors.lightMediumGray};
  height: 50px;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  z-index: 3;
  box-sizing: border-box;
`

const Close = styled.button`
  position: absolute;
  right: -30px;
  top: -30px;
  background-color: white;
  border: 1px solid ${({theme}) => theme.colors.black};
  height: 30px;
  line-height: 20px;
  width: 30px;
  border-radius: 30px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${({theme}) => theme.fonts.black};
  z-index: 3;
  cursor: pointer;
  color: black;
  box-sizing: border-box;
  &:hover {
    box-shadow: 0 0 10px ${({theme}) => theme.colors.blue};
    z-index: 10;
  }
  &:before {
    content: "X";
  }
`
