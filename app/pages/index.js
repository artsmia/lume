import React, {Component} from 'react'
import {createLock} from '../auth/client'

export default class extends Component {



  render() {
    return (
      <div>

      </div>
    )
  }

  componentDidMount(){
    const lock = createLock()
    lock.show()
  }

}
