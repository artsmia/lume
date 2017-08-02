import React, {Component} from 'react'
import styled from 'styled-components'
import Link from './Link'

export default class ItemDrawer extends Component {

  tabs = ["about", "details", "more"]

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
      details,
      more
    } = this
    return (
      <Column>
        <Link
          href={{
            pathname: "/",
          }}
          as={"/"}
        >
          Home
        </Link>
        <h2>{title}</h2>
        <Tabs>
          {tabLinks}
        </Tabs>
        {about}
        {details}
        {more}
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
          detail: {
            clips
          }
        }
      },
    } = this

    if (tab === "details") {
      return (
        <div>
          {clips.map( ({id, title, description}) => (
            <div
              key={id}
            >
              <h3>
                {title}
              </h3>
              <div
                dangerouslySetInnerHTML={{__html: description}}
              />

            </div>

          ))}
        </div>
      )
    }

    return null
  }


  get more() {
    const {
      props: {
        url: {
          query: {
            tab
          }
        },
        item: {
          relatedBooks
        }
      },
    } = this

    if (tab === "more") {
      return (
        <div>
          {relatedBooks.map( ({id, title}) => (
            <div
              key={id}
            >
              <Link
                href={{
                  pathname: '/live/book',
                  query: {
                    bookId: id,
                    pageIndex: 0
                  }
                }}
                as={`/book/${id}/0`}
              >
                <h3>
                  {title}
                </h3>
              </Link>
            </div>

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
