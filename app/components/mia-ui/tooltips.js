import React from 'react'
import styled, {css} from 'styled-components'
import {blue, white, black} from './colors'
import {Icon} from './icons'

const Tip = styled.div`

`


const position = ({position}) => {
  switch (position) {
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
    default: {

      break
    }
  }
}


const Tool = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 25px;
  background-color: ${blue};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  ${Tip}{
    visibility: hidden;
    height: 200px;
    width: 200px;
    background-color: ${white};
    border-radius: 5px;
    border: 1px solid ${blue};
    color: ${black};
    position: absolute;
    padding: 3px;
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
  ${position}
`

export const ToolTip = ({children, position}) => (
  <Tool
    position={position}
  >
    ?
    <Tip>
      {children}
    </Tip>
  </Tool>
)
