import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

export const LargeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`
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
