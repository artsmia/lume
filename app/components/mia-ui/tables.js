import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'
import { Icon } from './icons'
import { gray30 } from './colors'
import { A } from './links'

const Table = props => (
  <Flex
    width={1}
    flexDirection={'column'}
    alignItems={'flex-start'}
    p={2}
    {...props}
  >
    {props.children}
  </Flex>
)

// Table.defaultProps = {
//   width: 1,
//   flexDirection: 'column',
//   alignItems: 'flex-start',
//   p: 2
// }

let Row = styled(Flex)`
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  border-bottom: 1px solid ${gray30};
`

let Cell = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
`

let HeaderRow = styled(Row)``

HeaderRow.defaultProps = {
  width: 1
}

let HeaderCell = styled(Cell)``

let BodyRow = styled(Row)``

BodyRow.defaultProps = {
  width: 1
}

let BodyCell = styled(Cell)``

let TableThumb = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
`

export const Sorter = ({ onSort, variables, column, upValue, downValue }) => {
  let value = variables.filter.order.find(order => order.column === column)

  if (value) {
    value = value.direction
  }

  if (value === upValue) {
    return (
      <A>
        <Icon
          icon={'keyboard_arrow_up'}
          onClick={() =>
            onSort({
              column,
              newValue: downValue
            })
          }
        />
      </A>
    )
  } else {
    return (
      <A>
        <Icon
          icon={'keyboard_arrow_down'}
          onClick={() =>
            onSort({
              column,
              newValue: upValue
            })
          }
        />
      </A>
    )
  }
}

export { Table, HeaderRow, HeaderCell, BodyRow, BodyCell, TableThumb }
