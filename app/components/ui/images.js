import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const LIContainer = styled.div`
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LImg = styled.img`
  height: auto;
  max-height: 400px;
  object-fit: contain;
`

export const LargeImage = ({src}) => (
  <LIContainer>
    <LImg
      src={src}
    />
  </LIContainer>
)


export const SearchImage = styled.img`
  display: flex;
  width: 250px;
  height: 200px;
  margin: 10px;
  object-fit: cover;
`

export const AppSearchImage = ({src, href, as}) => (
  <Link
    as={as}
    href={href}
  >
    <a>
      <SearchImage
        src={src}
      />
    </a>
  </Link>
)
