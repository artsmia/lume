import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Flex, Box} from 'grid-styled'
import {Button} from './buttons'
import {grey30, black} from './colors'
import styled from 'styled-components'

export const Drawer = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
  border-right: 1px groove rgba(0,0,0,.2);
  transition: all .2s;
  position: absolute;
  top:0;
  left: -300px;
  width: 300px;
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: flex-start;
  justify-content: flex-start;
`

export const DrawerButton = styled.div`
  position: fixed;
  top: 5px;
  left:5px;
  transition: all .2s;
  height: 30px;
  width: 35px;
  opacity: 1;
  z-index: 2;
  margin: 10px;
  border-radius: 50px;

  span {
    display: block;
    position: absolute;
    height: 5px;
    width: 35px;
    background: ${black};
    opacity: 1;
    right: 0;
    transform: rotate(0deg);
    transition: all .2s ease-in-out;
  }

  span:nth-child(1){
    top: 0;
    transform-origin: left center;
  }

  span:nth-child(2){
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
  }

  span:nth-child(3){
    bottom: 0;
    transform-origin: left center;
  }
`

DrawerButton.defaultProps = {
  children: new Array(3).fill(<span/>)
}

export const DrawerPage = styled(Box)`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  margin-left: 0;
  overflow-y: scroll;
`


export const DrawerCheck = styled.input`
  margin: 10px;
  z-index: 3;
  position: fixed;
  top: 5px;
  left: 5px;
  transition: all .2s;
  height: 30px;
  width: 30px;
  opacity: 0;

  &:checked {
    left: 300px;
  }

  &:checked ~ ${DrawerButton} {
    left: 300px;

    span:nth-child(1){
      transform: rotate(45deg);
      top: 0px;
    }

    span:nth-child(2){
      width: 0%;
      opacity: 0;
    }

    span:nth-child(3){
      transform: rotate(-45deg);
      bottom: 0;
    }

  }

  &:checked ~ ${Drawer} {
    left: 0px;
  }

  &:checked ~ ${DrawerPage} {
    margin-left: 300px;
  }

`

DrawerCheck.defaultProps = {
  type: 'checkbox'
}
