import React, {Component} from 'react'
import { createStore } from 'redux'
import {Provider} from 'react-redux'




// function reducer (state = {counter: 0}, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state.counter + 1
//     case 'DECREMENT':
//       return state.counter - 1
//     default:
//       return state
//   }
// }


function loadState() {
  try {
    const stringState = localStorage.getItem('state')
    if (stringState === null) {
      return undefined
    }
    return JSON.parse(stringState)
  } catch (err) {
    console.log(err)
    return undefined
  }
}

function saveState(state) {
  try {
    const stringState = JSON.stringify(state)
    localStorage.setItem("state", stringState)
  } catch (err) {
    console.log(err)
    return undefined
  }
}


export default function connectToLocalStorage(Wrapped, reducer){

  const store = createStore(reducer)



  return class Connected extends Component {
    render(){
      <Provider>

      </Provider>
    }
  }
}
