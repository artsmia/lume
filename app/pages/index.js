import React, {Component} from 'react'
import {createLock} from '../auth'
import router from 'next/router'
import Cookies from 'js-cookie'

export default class extends Component {



  render() {
    return (
      <div>

      </div>
    )
  }

  componentDidMount(){

    const IDToken = Cookies.get('IDToken')
    const userId = Cookies.get('userId')
    if (IDToken && userId) {
      router.replace('/auth')
    } else {
      const lock = createLock()
      lock.show()  
    }
  }

}
