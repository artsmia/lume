import React, {Component} from 'react'
import Link from 'next/link'

export default class Index extends Component {
  render() {
    return (
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
    )
  }
}
