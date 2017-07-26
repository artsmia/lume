import React, {Component} from 'react'
import { createStore, combineReducers } from 'redux'
import {Provider} from 'react-redux'
import uuid from 'uuid/v4'
import fetch from 'isomorphic-unfetch'


function coreReducer (state = {counter: 0}, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state.counter + 1
    case 'DECREMENT':
      return state.counter - 1
    default:
      return state
  }
}


export function parseLocalStorage() {
  try {
    const stringState = localStorage.getItem("store")
    if (stringState === null) {
      return false
    }
    return JSON.parse(stringState)
  } catch (ex) {
    console.error("parseLocalStorage failed", ex)
    return false
  }
}

export function saveStateToLocalStorage(state) {
  try {
    const stringState = JSON.stringify(state)
    localStorage.setItem("store", stringState)
  } catch (ex) {
    console.error("saveStateToLocalStorage failed", ex)
  }
}


export async function translateOldData(){
  try {
    const response = await fetch('https://new.artsmia.org/crashpad/')

    const {
      objects: items,
      stories: features
    } = await response.json()
    const groupId = uuid()
    const title = "oldData"


    const itemIds = Object.keys(items)

    itemIds.forEach( (id) => {
      items[id].groupIds = [groupId]
    })

    const featureIds = Object.keys(features)

    featureIds.forEach( (id) => {
      features[id].groupIds = [groupId]
    })

    const defaultState = {
      groups: {
        [groupId]: {
          id: groupId,
          title,
          itemIds,
          featureIds
        }
      },
      items,
      features
    }

    return defaultState
  } catch (e) {
    console.error("initGroups failed")
  }
}




export default function connectToLocalStorage(Wrapped, reducer){
  return class Connected extends Component {

    store = createStore(coreReducer, {})

    render(){
      return (
        <Provider
          store={this.store}
        >
          <Wrapped/>
        </Provider>
      )
    }

    componentDidMount(){
      this.initRedux()
    }

    initRedux = async () => {
      try {
        let localState = parseLocalStorage()

        if (!localState) {
          localState = await translateOldData()
          saveStateToLocalStorage(localState)
        }

        // const combinedReducer = combineReducers({
        //   coreReducer,
        //   reducer
        // })

        this.store = createStore(
          coreReducer,
          localState,
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )

        this.store.subscribe(()=>{
          saveStateToLocalStorage(this.store.getState())
        })
      } catch (ex) {
        console.log("initRedux error", ex)
      }
    }
  }
}
