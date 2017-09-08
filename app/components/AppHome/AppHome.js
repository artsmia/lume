import React, {Component} from 'react'
import styled from 'styled-components'
import {H2} from '../../ui/h'
import Template from '../Template/Template'
import {Search} from '../../ui/search'
import AppItemList from '../AppItemList'

export default class AppHome extends Component {

  state = {
    search: ""
  }

  render() {


    const {
      props,
      props: {
        orgSub,
      },
      state: {
        search
      },
      handleChange
    } = this
    return (
      <Template
        drawer={false}
        {...props}
      >
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
      </Template>
    )
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

}

const SideContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
