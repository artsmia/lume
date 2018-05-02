import React from 'react'
import styled, {css} from 'styled-components'
import {blue, white, black, gray60} from './colors'
import {Icon} from './icons'
import {Flex, Box} from 'grid-styled'

const Tip = styled.div`

`


const position = ({position}) => {
  switch (position) {
    default:
    case "below": {
      return css`
        ${Tip}{
          top: 120%;
          left: 50%;
          margin-left: -100px;

        }

        ${Tip}:after {
          bottom: 100%;  /* At the top of the tooltip */
          left: 45%;
          border-width: 5px;
          margin-left: 5px;
        }
      `
    }

  }
}


const Tool = styled.div`
  position: absolute;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  background-color: ${blue};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: white;
  font-family: ${({theme}) => theme.font.bold};
  margin-top: 5px;
  transition: .1s all;
  ${Tip}{
    visibility: hidden;
    width: 200px;
    background-color: ${gray60};
    border-radius: 5px;
    border: 1px solid ${blue};
    color: ${white};
    position: absolute;
    padding: 5px;
    text-align: center;
    z-index: 2000;
  }

  ${Tip}:after {
    content: " ";
    position: absolute;
    border-style: solid;
    border-color: transparent transparent ${blue} transparent;


  }

  &:hover {
    ${Tip} {
      visibility: visible;
    }
  }

  a {
    color: white;
  }
  ${position}
`

const Container = styled(Flex)`
  height: 0;
`

export const ToolTip = ({children, position}) => (
  <Container
    w={1}
    pr={1}
    justifyContent={'flex-end'}
    alignItems={'flex-start'}
  >
    <Tool
      position={position}
    >

      ?
      <Tip>
        {children}
      </Tip>
    </Tool>
  </Container>
)
