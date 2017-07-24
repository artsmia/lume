import React, {Component} from 'react'
import Link from 'next/link'
import Tab from './Tab'
import {Column, Tabs} from './styled'

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
      More
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
        <More/>
      </Column>
    )
  }

  More = () => {
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
        },
        groupTitle
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
                <Link
                  href={{
                    pathname: "/story",
                    query: {
                      storyId,
                      groupTitle
                    }
                  }}
                  as={`/${groupTitle}/story/${storyId}`}
                  key={storyId}
                >
                  <a>
                    <h3>
                      {story.title}
                    </h3>
                  </a>
                </Link>
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
