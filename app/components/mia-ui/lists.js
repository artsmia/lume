import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'
import { gray60, blue, gray30 } from './colors'
import { H2 } from './text'
import Link from 'next/link'
import getImgSrc from '../shared/ImgSrcProvider'

const GridFlex = styled(Flex)`
  position: relative;
  min-height: 300px;
`

export const GridList = props => (
  <GridFlex {...props}>{props.children}</GridFlex>
)

GridList.defaultProps = {
  flexWrap: 'wrap'
}

const TileText = styled.div`
  position: absolute;
  background-color: ${gray30};
  width: 100%;
  height: 100%;
  top: 0;
  padding: 10px;
  transition: all 0.2s;
  opacity: 1;
  transform: translateY(0);
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`

const TileContainer = styled.a`
  position: relative;
  display: block;
  width: 100%;
  height: ${({ height }) => height};
  cursor: pointer;
  overflow: hidden;
  &:hover {
    ${TileText} {
      opacity: 0.3;
    }
  }
  ${({ selected, theme }) =>
    selected
      ? `
    box-shadow: 0 0 10px 3px ${theme.color.green};
  `
      : null};
`

const TileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

TileImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
}

const TileEl = props => (
  <Box w={props.w} p={props.p} onClick={props.onClick}>
    {props.link ? (
      <Link href={props.href} as={props.as}>
        <TileContainer
          href={props.as}
          height={'180px' || props.height}
          selected={props.selected}
          id={props.id}
        >
          <TileImage src={props.src} alt={props.alt} />
          <TileText>
            <TileH2 color={'white'}>{props.text}</TileH2>
          </TileText>
        </TileContainer>
      </Link>
    ) : (
      <TileContainer height={props.height} selected={props.selected}>
        <TileImage src={props.src} alt={props.alt} />
        <TileText>
          <H2 color={'white'}>{props.text}</H2>
        </TileText>
      </TileContainer>
    )}
  </Box>
)

const TileH2 = styled(H2)`
  font-family: ${({ theme }) => theme.font.light};
  font-size: 1.2rem;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const Tile = getImgSrc(TileEl)

// Tile.defaultProps = {
//   p: 1,
//   width: [1, 1/2, 1/2]
// }
//
// Tile.propTypes = {
//   href: PropTypes.shape({
//     pathname: PropTypes.string,
//     query: PropTypes.object
//   }),
//   as: PropTypes.string,
//   src: PropTypes.string,
//   alt: PropTypes.string,
//   text: PropTypes.string,
//   height: PropTypes.string,
//   link: PropTypes.bool
// }
