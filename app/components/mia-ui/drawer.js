import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Flex, Box} from 'grid-styled'
import {Button} from './buttons'
import {grey30, black} from './colors'
import styled, {css} from 'styled-components'

const drawerWidth = '400px'
const drawerWidthMobile = '66%'

export const Drawer = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
  border-right: 1px groove rgba(0,0,0,.2);
  transition: all .4s;
  position: absolute;
  top:0;
  transform: translateX(-100%);
  width: ${drawerWidth};
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: flex-start;
  justify-content: flex-start;

  @media only screen and (max-width: 400px) {
    width: ${drawerWidthMobile};
  }

  ${({open}) => open ? css`
    transform: translateX(0);


  `: null}
`

export const DrawerButton = styled.div`
  position: fixed;
  top: 15px;
  left:15px;
  transition: all .4s;
  height: 50px;
  width: 50px;
  opacity: 1;
  z-index: 2;
  cursor: pointer;
  background-color: white;
  border-radius: 50px;

  span {
    display: block;
    position: absolute;
    height: 5px;
    width: 30px;
    background: ${black};
    opacity: 1;
    right: 10px;
    transform: rotate(0deg);
    transition: all .2s ease-in-out;
  }

  span:nth-child(1){
    top: 24%;
    transform-origin: left center;
  }

  span:nth-child(2){
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
  }

  span:nth-child(3){
    bottom: 24%;
    transform-origin: left center;
  }

  ${({open}) => open ? css`
    left: ${drawerWidth};

    span:nth-child(1){
      transform: rotate(45deg);
      top: 10px;
      left: 12px;
      width: 36px;
    }

    span:nth-child(2){
      width: 0%;
      opacity: 0;
    }

    span:nth-child(3){
      transform: rotate(-45deg);
      bottom: 10px;
      left: 12px;
      width: 36px;
    }

  `: null}
`



DrawerButton.defaultProps = {
  children: [
    <span key={1}/>,
    <span key={2}/>,
    <span key={3}/>
  ]
}

export const DrawerPage = styled(Box)`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  margin-left: 0;
  overflow-y: scroll;
  transition: all .4s;
  ${({open}) => open ? css`
    margin-left: ${drawerWidth};
    @media only screen and (max-width: 400px) {
      margin-left: ${drawerWidthMobile};

    }
  `: null}
`


export const DrawerCheck = styled.input`
  margin: 10px;
  z-index: 3;
  position: fixed;
  top: 5px;
  left: 5px;
  transition: all .4s;
  height: 50px;
  width: 50px;
  opacity: 0;
  cursor: pointer;

  &:checked {
    left: ${drawerWidth};
  }

  &:checked ~ ${DrawerButton} {
    left: ${drawerWidth};

    span:nth-child(1){
      transform: rotate(45deg);
      top: 10px;
      left: 12px;
      width: 36px;
    }

    span:nth-child(2){
      width: 0%;
      opacity: 0;
    }

    span:nth-child(3){
      transform: rotate(-45deg);
      bottom: 10px;
      left: 12px;
      width: 36px;
    }

  }

  &:checked ~ ${Drawer} {
    transform: translateX(0);
  }

  &:checked ~ ${DrawerPage} {
    margin-left: ${drawerWidth};
  }



  @media only screen and (max-width: 400px) {
    &:checked ~ ${DrawerPage} {
      margin-left: ${drawerWidthMobile};
    }

    &:checked {
      left: ${drawerWidthMobile};
    }
    &:checked ~ ${DrawerButton} {
      left: ${drawerWidthMobile};
    }

  }

`

DrawerCheck.defaultProps = {
  type: 'checkbox'
}
