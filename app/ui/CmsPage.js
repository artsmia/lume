import React, {Component} from 'react'
import styled from 'styled-components'
import Template from './cms/Template'
import Link from 'next/link'

export default class CmsPage extends Component {
  render() {
    const {
      props: {
        items
      },
      handleChange
    } = this
    return (
      <Template>
        <input
          type={"file"}
          name={"myPic"}
          accept={"image/*"}
          onChange={handleChange}
        />
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

  handleChange = async (e) => {
    try {
      const file = e.target.files[0]

      let data = new FormData()
      data.append('file', file)

      const resp = await fetch("http://localhost:5000/image",{
        method: "POST",
        body: data
      })

      const json = await resp.json()

      console.log(json)

    } catch (ex) {
      console.error(ex)
    }
  }

}


const ItemList = styled.div`
  grid-column: left / right;
  grid-row: rest;
  display: flex;
  flex-direction: column;
`
