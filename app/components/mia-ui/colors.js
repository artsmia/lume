import { css } from 'styled-components'

export const gray = css`
  ${({ theme }) => theme.color.gray};
`

export const gray30 = css`
  ${({ theme }) => theme.color.gray30};
`

export const gray60 = css`
  ${({ theme }) => theme.color.gray60};
`

export const gray85 = css`
  ${({ theme }) => theme.color.gray85};
`

export const black = css`
  ${({ theme }) => theme.color.black};
`

export const blue = css`
  ${({ theme }) => theme.color.blue};
`

export const red = css`
  ${({ theme }) => theme.color.red};
`

export const purple = css`
  ${({ theme }) => theme.color.purple};
`

export const taupe = css`
  ${({ theme }) => theme.color.taupe};
`

export const green = css`
  ${({ theme }) => theme.color.green};
`

export const white = css`
  ${({ theme }) => theme.color.white};
`

export const transparent = css`
  ${({ theme }) => theme.color.transparent};
`

export const primaryTextColor = css`
  ${({ theme }) => theme.primaryTextColor};
`

export const primaryColor = css`
  ${({ theme }) => theme.primaryColor};
`

export const colorList = [
  'gray',
  'gray30',
  'gray60',
  'gray85',
  'black',
  'blue',
  'red',
  'taupe',
  'purple',
  'green',
  'white',
  'transparent'
]
