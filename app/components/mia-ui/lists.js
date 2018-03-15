import React from 'react'
import styled from 'styled-components'
import {Flex, Box} from 'grid-styled'
import {gray30} from './colors'
import {H3} from './text'
import Link from 'next/link'

export const GridList = (props) => (
  <Flex
    {...props}
  >
    {props.children}
  </Flex>
)

GridList.defaultProps = {
  flexWrap: 'wrap'
}

const TileText = styled.div`
  position: absolute;
  background-color: ${gray30};
  width: 100%;
  height: 40%;
  bottom: 0;
  padding: 10px;
  opacity: 0;
  transform: translateY(100%);
  transition: all .2s;
`

const TileContainer = styled.a`
  position: relative;
  display: block;
  width: 100%;
  height: ${({height}) => height};
  cursor: pointer;
  overflow: hidden;
  &:hover {
    ${TileText}{
      opacity: 1;
      transform: translateY(0);
    }
  }

`
TileContainer.defaultProps = {
  height: '180px'
}

const TileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`



export const Tile = (props) => (
  <Box
    {...props}
  >
    <Link
      href={props.href}
      as={props.as}
    >
      <TileContainer
        height={props.height}
      >
        <TileImage
          src={props.src}
        />
        <TileText>
          <H3>
            {props.text}
          </H3>
        </TileText>
      </TileContainer>
    </Link>

  </Box>

)

Tile.defaultProps = {
  p: 1,
  width: [1, 1/2, 1/2]
}
