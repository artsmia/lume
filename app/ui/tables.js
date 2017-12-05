import styled from 'styled-components'
import React, {Component} from 'react'
import KeyboardArrowDown from './icons/KeyboardArrowDown'
import KeyboardArrowUp from './icons/KeyboardArrowUp'
import {Search} from './search'
import {Button} from './buttons'
import PropTypes from 'prop-types'


export const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const Row = styled.div`
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

export const Cell = styled.div`
  font-family: ${({theme}) => theme.fonts.light};
  margin: 10px 5px;
  width: 100%;
  max-width: ${({width}) => (width) ? width : "100%"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
`

export const HeaderContainer = styled.div`
  font-family: ${({theme}) => theme.fonts.regular};
  margin: 10px 5px;
  width: 100%;
  max-width: ${({width}) => (width) ? width : "100%"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`
export const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export class Header extends Component {

  static defaultProps = {
    hasSearch: false,
    variables: {
      search: "",
      filter: {
        limit: 10,
        order: {
          column: "",
          direction: ""
        }
      }
    }
  }

  static propTypes = {
    hasSearch: PropTypes.bool,
    columns: PropTypes.array.isRequired,
    variables: PropTypes.object,
    onVariablesChange: PropTypes.func
  }

  state = {
    search: this.props.variables.search
  }

  render(){

    const {
      props: {
        hasSearch,
        columns,
        variables: {
          filter: {
            order
          }
        }
      },
      state: {
        search
      },
      handleSearchChange,
      handleArrowChange
    } = this


    return (
      <HeaderContainer>
        {(hasSearch) ? (<Row>
          <Search
            onChange={handleSearchChange}
            name={"search"}
            value={search}
          />
        </Row>) : null}

        <Row>
          {columns.map( ({
            title,
            column,
            upDirection,
            downDirection,
            width
          }) => (
            <Cell
              key={title}
              width={width}
            >
              {title}
              {(upDirection && downDirection && column) ? (
                <div>
                  <KeyboardArrowUp
                    onClick={()=>handleArrowChange({
                      column,
                      direction: upDirection
                    })}
                    fill={(
                      column === order.column &&
                      upDirection === order.direction
                    ) ? "black" : "grey"}
                  />
                  <KeyboardArrowDown
                    onClick={()=>handleArrowChange({
                      column,
                      direction: downDirection
                    })}
                    fill={(
                      column === order.column &&
                      downDirection === order.direction
                    ) ? "black" : "grey"}
                  />
                </div>
              ): null}

            </Cell>
          ))}
        </Row>
      </HeaderContainer>
    )
  }

  debounce = true

  handleSearchChange = ({target: {value}}) => {
    this.setState({
      search: value
    })

    if (this.debounce) {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(
        () => {
          this.props.onVariablesChange({
            ...this.props.variables,
            search: value
          })
        },
        2000
      )
    }



  }

  handleArrowChange = (newOrder) => {

    let newVariables = this.props.variables

    newVariables.filter.order = newOrder

    this.props.onVariablesChange({
      ...newVariables
    })
  }



}
