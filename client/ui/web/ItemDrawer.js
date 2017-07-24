import React, {Component} from 'react'
import styled from 'styled-components'
import Link from 'next/link'


class ItemDrawer extends Component {

  state = {
    selectedTab: "about"
  }

  render() {
    const {
      props,
      props: {
        groupTitle,
        item,
        item: {
          id,
          title,
        }
      },
      selectTab,
      state: {
        selectedTab
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
            onClick={()=>selectTab("about")}
          >
            About
          </Tab>
          <Tab
            onClick={()=>selectTab("details")}
          >
            Details
          </Tab>
          <Tab
            onClick={()=>selectTab("more")}
          >
            More
          </Tab>

        </Tabs>
        {more()}
      </Column>
    )
  }

  selectTab = (selectedTab) => {
    this.setState({selectedTab})
  }

  more = () => {
    const {
      state: {
        selectedTab
      },
      props: {
        item: {
          description
        }
      }
    } = this
    switch (selectedTab) {
      case "details": {
        return (
          <div>
            selectedTab: {selectedTab}
          </div>
        )
      }
      case "more": {
        return (
          <div>
            selectedTab: {selectedTab}
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

const Tab = styled.button`
  width: 100%;
  height: 50px;
  background-color: ${({selected}) => {(selected) ? 'grey' : ''}}
`

export default ItemDrawer
