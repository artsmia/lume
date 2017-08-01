import React, {Component} from 'react'
import styled from 'styled-components'
import Link from './Link'

export default class ItemDrawer extends Component {

  tabs = ["about", "details", "stories"]

  render() {
    const {
      props,
      props: {
        tab,
        item: {
          id,
          title,
        },
      },
      tabLinks,
      about,
      details
    } = this
    console.log(props)
    return (
      <Column>
        <h2>{title}</h2>
        <Tabs>
          {tabLinks}
        </Tabs>
        {about}
        {details}
      </Column>
    )
  }

  get tabLinks() {
    const {
      tabs,
      props: {
        item: {
          id
        }
      }
    } = this
    return tabs.map( tab => (
      <Link
        key={tab}
        href={{
          pathname: "/live/item",
          query: {
            itemId: id,
            tab: tab
          }
        }}
        as={`/${id}/${tab}`}
      >
        {tab}
      </Link>
    ))
  }

  get about() {
    const {
      props: {
        url: {
          query: {
            tab
          }
        },
        item: {
          text
        }
      },
    } = this

    if (tab === "about") {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: text
          }}
        />
      )
    }

    return null
  }

  get details() {
    const {
      props: {
        url: {
          query: {
            tab
          }
        },
        item: {
          text,
          detail: {
            clips
          }
        }
      },
    } = this

    if (tab === "details") {
      return (
        <div>
          {clips.map( ({id, title}) => (
            <h3
              key={id}
            >
              {title}
            </h3>
          ))}
        </div>
      )
    }

    return null
  }


}





export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30%;
  min-width: 300px;
  max-width: 400px;
  padding: 20px;
`

export const Tabs = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: stretch;
`
