import React, { Component, createElement} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './Types'
import { findDOMNode } from 'react-dom';

const sourceSpec = {
  beginDrag(props, monitor, component) {
    return {
      id: props.id,
      index: props.index,
    }
  },
}

const targetSpec = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = component.sortRef.getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    props.moveSortable(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  },
}

function targetCollect(connect, monitor){
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

function sourceCollect(connect, monitor){
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
  }
}


class Sortable extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    moveSortable: PropTypes.func.isRequired,
  }

  render() {
    const {
      isDragging,
      connectDragSource,
      connectDropTarget,
      id,
      Component,
      idKey,
      orgId,
      title
    } = this.props



    return connectDragSource(connectDropTarget(
      <div
        id={id}
        ref={(ref) => {
          this.sortRef = ref
        }}
        style={{
          opacity: (isDragging) ? .5 : 1,
        }}
      >

        {createElement(DetailOrder, {
          [idKey]: id,
          title,
          isDragging
        })}
      </div>
    ))
  }

  // componentDidMount(){
  //   let node = new Image()
  //   node.src = '/static/handle.png'
  //   this.props.connectDragPreview(node)
  // }


}

export const DetailOrder = ({title, isDragging}) => {
  return (
    <div
      style={{
        height: "132px",
        width: "100%",
        display: "flex",
        marginTop: "10px",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid grey",
        boxSizing: "border-box",
        backgroundColor: (isDragging) ? 'grey' : 'white',
      }}
    >
      {(title) ? title : "Detail"}
    </div>
  )
}



Sortable = DropTarget(ItemTypes.SORTABLE, targetSpec, targetCollect)(Sortable)

Sortable = DragSource(ItemTypes.SORTABLE, sourceSpec, sourceCollect)(Sortable)

export default Sortable
