import React, {Component} from 'react'
import styled from 'styled-components'

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
      }
    } = this
    return (
      <ExpContainer>
        <ExpHeader>
          <Button
            onClick={toggle}
          >
            <Arrow
              expanded={expanded}
            />
          </Button>
        </ExpHeader>
        <ExpBody
          expanded={expanded}
        >

        </ExpBody>
        <ExpFooter
          expanded={expanded}
        >

        </ExpFooter>
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
`

const ExpHeader = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid red;
  transition: all .2s;
`

const ExpBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid green;
  height: ${({expanded}) => (expanded) ? '200px' : '0px'};
  transition: all .2s;
`

const ExpFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid blue;
  height: ${({expanded}) => (expanded) ? '50px' : '0px'};
  transition: all .2s;
`
const Button = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 40px;
  background-color: transparent;
  border: none;
`

const Arrow = styled.i`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: ${({expanded}) => (expanded) ? 'rotate(45deg)' : 'rotate(-45deg)'};
  transition: all .2s;
`
