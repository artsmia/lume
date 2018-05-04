import React, {Component} from 'react'
import styled, {css} from 'styled-components'
import {Flex, Box} from 'grid-styled'
import {H2} from './text'
import {A} from './links'
import {Icon} from './icons'
import {gray30} from './colors'
import {Break} from './layout'
import PropTypes from 'prop-types'

export class Expander extends Component {

  static propTypes = {
    header: PropTypes.element,
    open: PropTypes.bool,
    icon: PropTypes.element,
    onRequestClose: PropTypes.func,
    onRequestOpen: PropTypes.func,
  }


  state = {
    open: this.props.open || false,
    openHeight: 0,
  }

  render(){

    const {
      props: {
        children,
        header,
        icon
      },
      state: {
        open
      },
      handleOpenRequest,
      handleCloseRequest
    } = this



    return (
      <ExpanderContainer
        flexWrap={'wrap'}
        p={2}
        my={2}
        innerRef={ref => {this.container = ref}}
      >
        <Header
          w={1}
          alignItems={'center'}
        >
          <A
            onClick={open ? handleCloseRequest : handleOpenRequest}
          >
            {icon ? icon : (
              <Icon
                icon={open ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
              />
            )}
          </A>

            {header}
        </Header>
        <Body
          width={1}
          innerRef={ref => {this.body = ref}}
        >
          {children}
        </Body>


      </ExpanderContainer>
    )
  }

  componentDidMount(){
    this.setState({
      openHeight: this.body.clientHeight
    })

    this.state.open ? this.styleOpen() : this.styleClose()

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.open !== this.state.open){
      this.setState({open: nextProps.open})
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    this.state.open ? this.styleOpen() : this.styleClose()

  }

  styleClose = () => {
    this.body.style.height = `${this.state.openHeight}px`
    this.body.style.opacity = 0
    this.body.style.height = 0
    this.body.style.overflow = 'hidden'
    this.body.style.visibility = 'hidden'
  }

  styleOpen = () => {
    this.body.style.opacity = 1
    this.body.style.height = `${this.state.openHeight}px`
    this.body.style.overflow = 'visible'
    this.body.style.visibility = 'visible'
    this.body.style.height = 'auto'
  }

  handleCloseRequest = () => {
    if (this.props.onRequestClose){
      this.props.onRequestClose()
    } else {
      this.setState({open: false})
    }
  }

  handleOpenRequest = () => {
    if (this.props.onRequestOpen){
      this.props.onRequestOpen()
    } else {
      this.setState({open: true})
    }
  }

}




const ExpanderContainer = styled(Flex)`
  border: 1px solid ${gray30};
  border-radius: 4px;
  overflow: visible;
`

const Header = styled(Flex)`

`

const Body = styled(Flex)`
  transition: height .2s, opacity .2s .2s;
  height: auto;
  visibility: hidden;
`
