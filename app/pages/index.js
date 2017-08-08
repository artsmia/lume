import React, {Component} from 'react'
import {createLock} from '../auth'

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
