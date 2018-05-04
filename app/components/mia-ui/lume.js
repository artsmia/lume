import React from 'react'
import styled from 'styled-components'
import {Flex, Box} from 'grid-styled'
import {gray60} from './colors'

export const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const ThumbOverlay = styled.div`
  position: absolute;
  background-color: ${gray60};
  width: 100%;
  height: 50%;
  bottom: 0;
  opacity: 1;
  transform: translateY(20%);
  transition: all .2s;
  padding: 5px;
  display: flex;
  justify-content: space-between;
`
export const ThumbContainer = styled(Flex)`
  position: relative;
  display: block;
  cursor: pointer;
  height: 130px;
  overflow: hidden;
  border: 1px solid ${gray60};
  border-radius: 4px;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.3);
  transition: .2s all;
  ${({selected, theme}) => {
    if (selected) {
      return `
        box-shadow: 10px 14px 25px rgba(0,0,0,0.7);
        transform: scale(1.05);
      `
      }
  }}
  &:hover {
    ${ThumbOverlay}{
      opacity: 1;
      transform: translateY(0);
    }
  }
`
