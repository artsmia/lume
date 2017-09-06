import React, {Component} from 'react'
import styled from 'styled-components'
import {H3} from './h'

export class ExpanderContainer extends Component {
  render(){
    return (
      <ExpanderContainerContainer>
        {this.props.children}
      </ExpanderContainerContainer>
    )
  }
}

const ExpanderContainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
`

export class Expander extends Component {

  state = {
    expanded: false,
  }

  render() {
    const {
      toggle,
      state: {
        expanded
      },
      props: {
        header,
        footer,
        children
      }
    } = this
    return (
      <ExpContainer>
        <ExpHeader>
          <Button
            onClick={toggle}
            aria-label={"Expand Detail"}
          >
            <Arrow
              expanded={expanded}
            />
          </Button>
          {header}
        </ExpHeader>
        <ExpBody
          expanded={expanded}
        >
          {children}
        </ExpBody>

        {(footer) ? (
          <ExpFooter
            expanded={expanded}
          >
            {footer}
          </ExpFooter>
        ): null}


      </ExpContainer>
    )
  }

  toggle = () => {
    this.setState(({expanded}) => ({expanded: !expanded}))
  }
}

const ExpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  border-radius: 2px;
  border: 1px solid ${({theme})=> theme.colors.lightMediumGray};
  margin: 10px 10px;;
`

const ExpHeader = styled.div`
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transition: all .2s;
  padding: 10px;
`

const ExpBody = styled.div`
  display: flex;
  visibility: ${({expanded}) => (expanded) ? 'visible' : 'hidden'};
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: ${({expanded}) => (expanded) ? '50px' : '0px'};
  height: ${({expanded}) => (expanded) ? '' : '0px'};
  transition: all .2s;
  border-bottom: ${({theme, expanded})=> (expanded) ? `1px solid ${theme.colors.lightMediumGray}` : ''};
  border-top: ${({theme, expanded})=> (expanded) ? `1px solid ${theme.colors.lightMediumGray}` : ''};
  padding: ${({expanded}) => (expanded) ? '10px' : '0'};
  opacity: ${({expanded}) => (expanded) ? '1' : '0'};
`

const ExpFooter = styled.div`
  display: flex;
  visibility: ${({expanded}) => (expanded) ? 'visible' : 'hidden'};
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: ${({expanded}) => (expanded) ? '50px' : '0px'};
  transition: all .2s;
  overflow: hidden;
  padding: ${({expanded}) => (expanded) ? '10px' : '0'};
  opacity: ${({expanded}) => (expanded) ? '1' : '0'};
`
const Button = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 40px;
  background-color: transparent;
  border: none;
  margin-right: 10px;
  outline: none;
`

const Arrow = styled.i`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: ${({expanded}) => (expanded) ? 'rotate(45deg)' : 'rotate(-45deg)'};
  transition: all .2s;
`
