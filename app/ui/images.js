import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const LIContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LImg = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: scale-down;
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
