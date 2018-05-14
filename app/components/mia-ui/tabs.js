import React, { Component, cloneElement, Children } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Flex, Box } from "grid-styled"

export class TabContainer extends Component {
  // static propTypes = {
  //   selectedTab: PropTypes.string.isRequired,
  // }

  state = {
    selectedTab: this.props.selectedTab
  }

  render() {
    const {
      props,
      props: { children },
      selectTab,
      state: { selectedTab }
    } = this

    let childrenWithProps = []

    Children.forEach(children, (child, index) => {
      if (child) {
        childrenWithProps.push(
          cloneElement(child, {
            selectedTab,
            selectTab,
            key: index
          })
        )
      }
    })
    return (
      <Flex width={1} flexDirection={"column"}>
        {childrenWithProps}
      </Flex>
    )
  }

  componentWillReceiveProps({ selectedTab }) {
    this.setState({ selectedTab })
  }

  selectTab = tabName => {
    this.setState({ selectedTab: tabName })
  }
}

export class TabHeader extends Component {
  render() {
    const {
      props,
      props: { children, selectedTab, selectTab, name }
    } = this

    let childrenWithProps = []

    Children.forEach(children, (child, index) => {
      if (child) {
        childrenWithProps.push(
          cloneElement(child, {
            selectedTab,
            selectTab,
            key: index
          })
        )
      }
    })
    return (
      <HeaderContainer flex={"0 0 auto"} id={"tab-header"}>
        {childrenWithProps}
      </HeaderContainer>
    )
  }
}

export class Tab extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  }

  render() {
    const {
      props: { name, children, selectedTab, selectTab, onClick }
    } = this
    return (
      <TabButton selected={name === selectedTab} onClick={onClick}>
        {children}
      </TabButton>
    )
  }
}

export class TabBody extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  }

  render() {
    const {
      props: { children, name, selectedTab }
    } = this

    if (selectedTab !== name) return null

    return (
      <TabBodyContainer selected={selectedTab === name}>
        {children}
      </TabBodyContainer>
    )
  }
}

const HeaderContainer = styled(Flex)`
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
  border-bottom: ${({ selected, theme }) =>
    selected
      ? `3px solid ${theme.color.blue}`
      : `3px solid ${theme.color.gray30}`};
  box-sizing: border-box;
  transition: 0.2s all;
  font-family: ${({ theme, selected }) =>
    selected ? theme.font.bold : theme.font.regular};
  color: ${({ theme, selected }) =>
    selected ? theme.color.black : theme.color.gray60};
  &:hover {
    background-color: ${({ theme }) => theme.color.white};
    font-family: ${({ theme }) => theme.font.bold};
  }
`

const TabBodyContainer = styled(Flex)`
  display: ${({ selected }) => (selected ? "flex" : "none")};
  width: 100%;
  height: 100%;
  flex-direction: column;
`
