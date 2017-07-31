import React, {Component} from 'react'
import Link from 'next/link'


export default class LoginPage extends Component {

  render() {
    const {
      handleChange
    } = this
    return (
      <div>
        <label>
          email
        </label>
        <input
          name={"email"}
          onChange={handleChange}
        />
        <label>
          password
        </label>
        <input
          name={"password"}
          onChange={handleChange}
        />
        <button>
          Login
        </button>
        <button>
          Createuser
        </button>

      </div>
    )
  }

  handleChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value
    })
  }

}
