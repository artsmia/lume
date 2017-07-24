import React, {Component} from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Tab from './Tab'


export default class ItemDrawer extends Component {

  render() {
    const {
      props,
      props: {
        groupTitle,
        item,
        item: {
          id: itemId,
          title,
        },
        tab
      },
      more
    } = this
    return (
      <Column>
        <Link
          href={{
            pathname: "/group",
            query: {
              groupTitle,
            }
          }}
          as={`/${groupTitle}`}
        >
          <a>
            main
          </a>
        </Link>

        <h1>{title}</h1>

        <Tabs>
          <Tab
            href={{
              pathname: "/item",
              query: {
                itemId,
                groupTitle,
                tab: "about"
              }
            }}
            as={`/${groupTitle}/${itemId}/about`}
          >
            About
          </Tab>
          <Tab
            href={{
              pathname: "/item",
              query: {
                itemId,
                groupTitle,
                tab: "details"
              }
            }}
            as={`/${groupTitle}/${itemId}/details`}
          >
            Details
          </Tab>
          <Tab
            href={{
              pathname: "/item",
              query: {
                itemId,
                groupTitle,
                tab: "stories"
              }
            }}
            as={`/${groupTitle}/${itemId}/stories`}
          >
            Stories
          </Tab>

        </Tabs>
        {more()}
      </Column>
    )
  }

  more = () => {
    const {
      props: {
        item: {
          description,
          relatedStories,
          views
        },
        tab,
        data: {
          stories
        }
      }
    } = this
    switch (tab) {
      case "details": {
        let annotations = []
        views.forEach( (view) => {
          view.annotations.forEach( (annotation, index) => {
            annotations.push(
              <div>
                <h4
                  key={index}
                >
                  {index}: {annotation.title}
                </h4>
              </div>
            )
          })
        })
        return (
          <div>
            {annotations}
          </div>
        )
      }
      case "stories": {
        return (
          <div>
            tab: {tab}

            {relatedStories.map( (storyId) => {
              const story = stories[storyId]
              return (
                <h3>
                  {story.title}
                </h3>
              )
            })}
          </div>
        )
      }
      default:
      case "about": {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: description
            }}
          />
        )
      }
    }
  }

}

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30%;
  min-width: 300px;
  padding: 20px;
`

const Tabs = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: stretch;
`
