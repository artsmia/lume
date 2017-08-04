import styled from 'styled-components'

export const Table = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const Row = styled.tr`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: ${({theme}) => `1px solid ${theme.colors.lightMediumGray}`};
  background-color: ${({theme}) => theme.colors.white};
  transition: .2s all;

  &:hover {
    background-color: ${({theme}) => theme.colors.gray};
  }
`

export const Cell = styled.td`
  font-family: ${({theme}) => theme.fonts.light};
  margin: 10px 5px;
  width: 100%;
  max-width: ${({width}) => (width) ? width : "100%"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Header = styled.th`
  font-family: ${({theme}) => theme.fonts.regular};
  margin: 10px 5px;
  width: 100%;
  max-width: ${({width}) => (width) ? width : "100%"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
export const TBody = styled.tbody`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
