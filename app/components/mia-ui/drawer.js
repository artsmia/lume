import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from 'grid-styled'
import { Button } from './buttons'
import { grey30, black } from './colors'
import styled, { css } from 'styled-components'

const drawerWidth = '400px'
const drawerWidthMobile = '66%'

export const Drawer = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
  border-right: 1px groove rgba(0, 0, 0, 0.2);
  transition: all 0.4s;
  position: absolute;
  top: 0;
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

  ${({ open }) =>
    open
      ? css`
          transform: translateX(0);
        `
      : null};
`

export const DrawerButton = styled.button`
  position: fixed;
  top: 15px;
  left: 15px;
  transition: all 0.2s;
  height: 40px;
  width: 40px;
  opacity: 0.85;
  z-index: 2;
  cursor: pointer;
  background-color: white;
  border-radius: 40px;
  margin-left: 10px;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
    box-shadow: -2px 2px 1px rgba(0, 0, 0, 0.2);
  }

  span {
    display: block;
    position: absolute;
    height: 4px;
    width: 50%;
    background: ${black};
    opacity: 1;
    transform: rotate(0deg);
    transition: all 0.2s ease-in-out;
    left: 25%;
  }

  span:nth-child(1) {
    top: 24%;
    transform-origin: left center;
  }

  span:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
  }

  span:nth-child(3) {
    bottom: 24%;
    transform-origin: left center;
  }

  @media only screen and (max-width: 400px) {
    left: auto;
    right: 20px;
    margin-left: 0;
  }

  ${({ open }) =>
    open
      ? css`
          @media only screen and (min-width: 401px) {
            left: ${drawerWidth};
          }

          span {
            left: 26%;
          }

          span:nth-child(1) {
            transform: rotate(45deg);
            top: 24%;
            width: 60%;
          }

          span:nth-child(2) {
            width: 0%;
            opacity: 0;
          }

          span:nth-child(3) {
            transform: rotate(-45deg);
            bottom: 24%;
            width: 60%;
          }
        `
      : null};
`

DrawerButton.defaultProps = {
  children: [<span key={1} />, <span key={2} />, <span key={3} />]
}

export const DrawerPage = styled(Box)`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  margin-left: 0;
  overflow-y: scroll;
  transition: all 0.4s;
  ${({ open }) =>
    open
      ? css`
          margin-left: ${drawerWidth};
          @media only screen and (max-width: 400px) {
            margin-left: ${drawerWidthMobile};
          }
        `
      : null};
`
//
// export const DrawerCheck = styled.input`
//   margin: 10px;
//   z-index: 3;
//   position: fixed;
//   top: 5px;
//   left: 5px;
//   transition: all 0.4s;
//   height: 50px;
//   width: 50px;
//   opacity: 0;
//   cursor: pointer;
//
//   &:checked {
//     left: ${drawerWidth};
//   }
//
//   &:checked ~ ${DrawerButton} {
//     left: ${drawerWidth};
//
//     span:nth-child(1) {
//       transform: rotate(45deg);
//       top: 10px;
//       left: 12px;
//       width: 36px;
//     }
//
//     span:nth-child(2) {
//       width: 0%;
//       opacity: 0;
//     }
//
//     span:nth-child(3) {
//       transform: rotate(-45deg);
//       bottom: 10px;
//       left: 12px;
//       width: 36px;
//     }
//   }
//
//   &:checked ~ ${Drawer} {
//     transform: translateX(0);
//   }
//
//   &:checked ~ ${DrawerPage} {
//     margin-left: ${drawerWidth};
//   }
//
//   @media only screen and (max-width: 400px) {
//     &:checked ~ ${DrawerPage} {
//       margin-left: ${drawerWidthMobile};
//     }
//
//     &:checked {
//       left: ${drawerWidthMobile};
//     }
//     &:checked ~ ${DrawerButton} {
//       left: ${drawerWidthMobile};
//     }
//   }
// `
//
// DrawerCheck.defaultProps = {
//   type: 'checkbox'
// }
