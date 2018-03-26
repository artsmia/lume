import React, {Component} from 'react'
import styled, {css} from 'styled-components'
import {Flex, Box} from 'grid-styled'
import {H2} from './text'
import {A} from './links'
import {Icon} from './icons'
import {gray30} from './colors'
import {Break} from './layout'


export class Expander extends Component {


  state = {
    expanded: true,
    height: 0
  }

  render(){

    const {
      props: {
        title,
        children
      },
      state: {
        expanded
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
          expanded={expanded}
        >
          <H2>{title}</H2>
          <A
            onClick={toggle}
          >
            <Icon
              icon={expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
            />
          </A>
        </Header>
        <Body
          width={1}
          expanded={expanded}
          innerRef={ref => {this.body = ref}}
        >
          {children}
        </Body>


      </ExpanderContainer>
    )
  }


  toggle = () => {
    this.setState(
      ({expanded, height})=>{




        return {
          expanded: !expanded,
          height: expanded ? this.body.clientHeight : height
        }
      },
      ()=>{
        if (this.state.expanded){
          console.log("expanded")
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
