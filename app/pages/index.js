import React, {Component} from 'react'
import Link from 'next/link'


export default class IndexPage extends Component {

  render() {
    return (
      <div>
        <Link
          href={{
            pathname: "/login"
          }}
          as={`/login`}
        >
          <a>
            Login / Signup
          </a>
        </Link>
      </div>
    )
  }
}
