import React, {Component, createElement ,cloneElement} from 'react'
import styled from 'styled-components'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Sortable from './Sortable'


const DefaultComponent = (props) => (
  <div
    style={{
      height: "50px",
      width: "100px",
      backgroundColor: "salmon",
      margin: "10px",
      textAlign: "center"
    }}
  >
    {props.id}
  </div>
)

export default class Sorter extends Component {

  static defaultProps = {
    sortables:[
      {
        id: "b",
        index: 2
      },
      {
        id: "c",
        index: 3
      },
      {
        id: "a",
        index: 1
      },
      {
        id: "f",
        index: 4
      },
      {
        id: "g",
        index: 6
      },
    ],
    Component: <DefaultComponent/>,
    onNewOrder: (newOrder) => {
      console.log(newOrder)
    },
    idKey: "id"
  }

  render() {
    const {
      state: {
        sortables,
      },
      props: {
        Component,
        idKey,
        orgId
      }
    } = this


    return (
      <DragDropContextProvider
        backend={HTML5Backend}
      >
        <div>
          {sortables.map((sortable, index) => (
            <Sortable
              index={index}
              key={sortable.id}
              id={sortable.id}
              moveSortable={this.moveSortable}
              idKey={idKey}
              Component={Component}
              orgId={orgId}
              title={sortable.title}
            />
        ))}
        </div>
      </DragDropContextProvider>
    )
  }

  constructor(props) {
    super(props)
    let ordered = props.sortables.slice()
    ordered = ordered.sort((a, b) => a.index - b.index)
    this.state = {
      sortables: ordered,
    }
  }

  // componentWillReceiveProps({sortables}){
  //   let ordered = sortables.slice()
  //   ordered = ordered.sort((a, b) => a.index - b.index)
  //   this.setState({sortables: ordered})
  // }

  moveSortable = (dragged, hovered) => {

    this.setState(({sortables}) => {
      let newOrder = sortables.slice()

      newOrder[hovered] = sortables[dragged]
      newOrder[dragged] =  sortables[hovered]

      return {
        sortables: newOrder
      }
    },this.reportNewOrder)
  }

  reportNewOrder = () => {
    let newOrder = this.state.sortables.slice()
    newOrder = newOrder.map( (sortable, index) => {
      return {
        ...sortable,
        index
      }
    })
    this.props.onNewOrder(newOrder)
  }

}
