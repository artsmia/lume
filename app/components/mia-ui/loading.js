import React from "react"
import styled, { keyframes } from "styled-components"
import { black, gray30, gray60 } from "./colors"
import { Flex, Box } from "grid-styled"

const spin = keyframes`
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  } 50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  } 100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
`

export const Spinner = styled(Box)`
  height: 100%;
  max-width: 40px;
  max-height: 40px;
  background-color: ${black};
  animation: ${spin} 1.2s infinite ease-in-out;
  z-index: 3;
`

const Overlay = styled(Flex)`
  position: fixed;
  display: flex;

  top: 0;
  left: 0;
  height: 100%;
  background-color: ${gray60};
  z-index: 5000;
`
export const LoadFlex = styled(Flex)`
  position: absolute;
  height: 100%;
  background-color: ${gray30};
  z-index: 2;
`

export const Waiting = () => (
  <LoadFlex w={1} justifyContent={"center"} alignItems={"center"}>
    <Spinner w={1} />
  </LoadFlex>
)

export const Loading = () => (
  <Overlay w={1} justifyContent={"center"} alignItems={"center"}>
    <Spinner w={1} />
  </Overlay>
)
