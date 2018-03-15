import React from 'react'
import { Flex, Box } from 'grid-styled'
import styled from 'styled-components'
import {black, white} from './colors'


const PageFlex = styled(Flex)`
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0,0,0,.1)
`

export const Page = (props) => (
  <PageFlex
    flexWrap={'wrap'}
  >
    <Box
      width={[1, 3/4, 3/4, 2/3]}
      mx={'auto'}
      my={[1,3, 3,5]}
      p={[2,3,3,4]}
    >
      {props.children}
    </Box>
  </PageFlex>
)

export const Card = styled(Box)`
  background-color: white;
  border: 1px solid ${black};
`

Card.defaultProps = {
  p: 2
}
