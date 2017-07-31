import Link from 'next/link'
import React, {Component} from 'react'
// import connectToLocalStorage from '../redux'

class IndexPage extends Component {

  render() {
    return (
      <div>

        {/* <div>
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
        </div> */}
      </div>
    )
  }
}

// IndexPage = connectToLocalStorage(IndexPage)

export default IndexPage
