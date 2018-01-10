import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../ui/buttons'
import {Search} from '../../ui/search'
import {Row} from '../../ui/layout'
import {LinkStyled} from '../../ui/links'

export default class ObjSelector extends Component {

  state ={
    search: ""
  }

  render() {

    if (!this.props.objs) return null

    const {
      props: {
        objs,
        onSelect
      },
      handleCreate,
      state: {
        search
      },
      handleChange,
      handleSearch
    } = this

    return (
      <Container>
        <Row>
          <Search
            name={"search"}
            value={search}
            onChange={handleChange}
          />
          <Button
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button
            onClick={handleCreate}
            color={"green"}
          >
            Create Object
          </Button>
        </Row>

        <Results>
          {objs.map(obj => (
            <LinkStyled
              key={obj.id}
              onClick={()=>onSelect(obj.id)}
            >
              {obj.title || "Untitled"}
            </LinkStyled>
          ))}
        </Results>


      </Container>
    )
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  handleCreate = async () => {
    try {

      let {
        data: {
          createObj: {
            id: objId
          }
        }
      } = await this.props.createObj()

      this.props.onSelect(objId)
    } catch (ex) {
      console.error(ex)
    }
  }

  handleSearch = () => {
    this.props.refetch({
      filter: {
        ...this.props.variables.filter,
        search: this.state.search
      }
    })
  }


}

const Container = styled.div`
  height: 600px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items: flex-start;

`

const Results = styled.div`
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
  margin: 15px;
`
