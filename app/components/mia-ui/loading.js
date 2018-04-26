import React from 'react'
import styled, {keyframes} from 'styled-components'
import {black, gray30, gray60} from './colors'

const spin = keyframes`
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  } 50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  } 100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
`

export const Spinner = styled.div`
  height: 100%;
  width: 100%;
  max-width: 40px;
  max-height: 40px;
  background-color: ${black};
  animation: ${spin} 1.2s infinite ease-in-out;
  z-index: 3;
`

const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${gray60};
  z-index: 5000;
`
export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${gray30};
  z-index: 2;
`



export const Waiting = () => (
  <Box>
    <Spinner/>
  </Box>
)

export const Loading = () => (
  <Overlay>
    <Spinner/>
  </Overlay>
)
