import React, {Component} from 'react'
import styled from 'styled-components'
import {H2} from '../../ui/h'
import {Search} from '../../ui/search'
import AppItemList from '../AppItemList'
import PropTypes from 'prop-types'

export default class AppHome extends Component {

  static displayName = "AppHome"

  static propTypes = {
    orgSub: PropTypes.string.isRequired
  }

  state = {
    search: ""
  }

  render() {

    const {
      props: {
        orgSub,
      },
      state: {
        search
      },
      handleChange
    } = this

    return (
      <Container>
        <SideContainer>
          <H2>Search Art Stories</H2>
          <Search
            name={"search"}
            value={search}
            onChange={handleChange}
          />
        </SideContainer>
        <AppItemList
          orgSub={orgSub}
          search={search}
        />
      </Container>
    )
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`

const SideContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
