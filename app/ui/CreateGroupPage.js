import React, {Component} from 'react'
import styled from 'styled-components'
import Template from './cms/Template'
import Link from 'next/link'
import apiFetch from '../utils/apiFetch'

export default class CreateGroupPage extends Component {
  render() {
    const {
      handleChange,
      createGroup
    } = this
    return (
      <Template>
        <ItemList>
          <input
            name={"groupTitle"}
            onChange={handleChange}
          />

          <button
            onClick={createGroup}
          >
            Create Group
          </button>
        </ItemList>
      </Template>
    )
  }

  createGroup = async () => {
    try {
      const data = await apiFetch(`mutation {
        editOrCreateGroup(
          title: "${this.state.groupTitle}"
        ) {
          id
        }
      }`)
      console.log(data)
    } catch (ex) {
      console.error(ex)
    }
  }

  handleChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value
    })
  }


}


const ItemList = styled.div`
  grid-column: left / right;
  grid-row: rest;
  display: flex;
  flex-direction: column;
`
