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
    exp: PropTypes.bool,
    onChange: PropTypes.func,
  }


  state = {
    exp: true,
    height: 0,
  }

  render(){

    const {
      props: {
        children,
        header
      },
      state: {
        exp 
      },
      toggle
    } = this




    return (
      <ExpanderContainer
        flexWrap={'wrap'}
        p={2}
        my={2}
      >
        <Header
          width={1}
          exp={exp}
        >
          <A
            onClick={toggle}
          >
            <Icon
              icon={exp ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
            />
          </A>
          {header}
        </Header>
        <Body
          width={1}
          exp={exp}
          innerRef={ref => {this.body = ref}}
        >
          {children}
        </Body>


      </ExpanderContainer>
    )
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.exp !== this.state.exp){
      this.toggle()
    }
  }


  toggle = () => {
    this.setState(
      ({exp, height})=>{




        return {
          exp: !exp,
          height: exp ? this.body.clientHeight : height
        }
      },
      ()=>{
        this.props.onChange(this.state.exp)
        if (this.state.exp){
          console.log("exp")
          console.log(this.state )
          this.body.style.opacity = 1
          this.body.style.height = `${this.state.height}px`
          this.body.style.overflow = 'visible'
        } else {
          console.log("collapsed")
          this.body.style.opacity = 0
          this.body.style.height = 0
          this.body.style.overflow = 'hidden'
        }
      }
    )



  }

}




const ExpanderContainer = styled(Flex)`
  border: 1px solid ${gray30};
  border-radius: 4px;
`

const Header = styled(Flex)`

`

const Body = styled(Flex)`
  transition: height .2s, opacity .2s .2s;
  height: auto;

`
