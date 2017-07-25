import Link from 'next/link'
import React, {Component} from 'react'
import {getGroups} from '../utils'


export default class IndexPage extends Component {

  state = {
    groups: {}
  }

  render() {
    const {
      groups
    } = this.state
    return (
      <div>
        <div>
          {Object.keys(groups).map( (id) => {
            let {title} = groups[id]
            return (
              <Link
                href={{
                  pathname: "/group",
                  query: {
                    groupId: id,
                    groupTitle: title
                  }
                }}
                as={`/${title}`}
                key={id}
              >
                <h4>
                  {title}
                </h4>
              </Link>
            )
          })}
        </div>
        <div>
          <h1>CMS</h1>

          <Link
            href={{
              pathname: "/groupBrowser",
            }}
            as={`/groups`}
          >
            <a>
              Groups
            </a>
          </Link>
          <Link
            href={{
              pathname: "/itemBrowser",
            }}
            as={`/items`}
          >
            <a>
              Items
            </a>
          </Link>
        </div>
      </div>
    )
  }

  componentDidMount(){
    try {
      this.getGroups()
    } catch (e) {
      console.error("localStorage and json parsing failed in groupbrowser", e)
    }
  }

  getGroups = async () => {
    try {
      const groups = await getGroups()
      this.setState({groups})
    } catch (e) {
      console.error("there was an error", e)

    }
  }
}
