import React, {Component} from 'react'
import styled from 'styled-components'
import Template from './cms/Template'
import Link from 'next/link'

export default class CmsPage extends Component {
  render() {
    const {
      props: {
        items
      }
    } = this
    return (
      <Template>
        <ItemList>
          {items.map( ({id, title}) => (
            <Link
              key={id}
            >
              {title}
            </Link>
          ))}
        </ItemList>
      </Template>
    )
  }



}


const ItemList = styled.div`
  grid-column: left / right;
  grid-row: rest;
  display: flex;
  flex-direction: column;
`
