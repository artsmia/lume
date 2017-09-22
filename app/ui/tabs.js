import {Component, cloneElement, Children} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


export class TabContainer extends Component {

  static propTypes = {
    selectedTab: PropTypes.string.isRequired,
  }

  state = {
    selectedTab: this.props.selectedTab
  }

  render(){
    const {
      props,
      props: {
        children,
      },
      selectTab,
      state: {
        selectedTab,
      }

    } = this

    const childrenWithProps = Children.map(
      children,
      (child) => (cloneElement(child, {
        selectedTab,
        selectTab
      }))
    )
    return (
      <Container>
        {childrenWithProps}
      </Container>
    )
  }


  componentWillReceiveProps({selectedTab}){
    this.setState({selectedTab})
  }

  selectTab = (tabName) => {
    this.setState({selectedTab: tabName})
  }


}


export class TabHeader extends Component {
  render(){
    const {
      props,
      props: {
        children,
        selectedTab,
        selectTab
      }
    } = this

    const childrenWithProps = Children.map(
      children,
      (child) => (cloneElement(child, {
        selectedTab,
        selectTab
      }))
    )
    return (
      <HeaderContainer>
        {childrenWithProps}
      </HeaderContainer>
    )
  }
}

export class Tab extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  render(){
    const {
      props: {
        name,
        children,
        selectedTab,
        selectTab,
        onClick
      }
    } = this
    return (
      <TabButton
        selected={(name === selectedTab)}
        onClick={onClick}
      >
          {children}
      </TabButton>
    )
  }
}

export class TabBody extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  render(){
    const {
      props: {
        children,
        name,
        selectedTab
      }
    } = this

    if (selectedTab !== name) return null

    return (
      <TabBodyContainer
        selected={(selectedTab === name)}
      >
        {children}
      </TabBodyContainer>
    )
  }
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const HeaderContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`

const TabButton = styled.a`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${({selected, theme}) => (selected) ? `3px solid ${theme.colors.blue}`: `3px solid ${theme.colors.lightMediumGray}`};
  box-sizing: border-box;
  transition: .2s all;
  font-family: ${({theme, selected}) => (selected) ? theme.fonts.bold: theme.fonts.regular};
  color: ${({theme, selected}) => (selected) ? theme.colors.black : theme.colors.darkGray};
  &:hover {
    background-color: ${({theme}) => theme.colors.white};
    font-family: ${({theme}) => theme.fonts.bold};
  }
`

const TabBodyContainer = styled.div`
  display: ${({selected}) => (selected) ? "flex" : "none"};
  width: 100%;
  height: 100%;
  flex-direction: column;
`
