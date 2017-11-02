import React, {Component} from 'react'
import styled from 'styled-components'
import {Search} from '../../ui/search'
import {Table, Header, Row, Cell} from '../../ui/tables'
import Data from './index.js'

export default class SearchSortFilter extends Component {


  state = {
    search: "",
    pageSize: 10
  }


  render() {

    const {
      handleChange,
      loadMore,
      state: {
        search,
        pageSize
      },
      props: {
        orgSub
      }
    } = this

    return(
      <Container>
        <Search
          onChange={handleChange}
        />
        <Table>
          <Header>

          </Header>
          <Data
            orgSub={orgSub}
            search={search}
            pageSize={pageSize}
          />
        </Table>
      </Container>
    )
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})


}




const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 110vh;
`
