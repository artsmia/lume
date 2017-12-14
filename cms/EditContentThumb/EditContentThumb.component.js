import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {H3, H4} from '../../ui/h'
import {Spinner} from '../../ui/spinner'
import Image from '../../shared/Image'
import { DragSource, DropTarget } from 'react-dnd'


class EditContentThumb extends Component {

  static defaultProps = {
    onSelect: PropTypes.func.isRequired,
    contentId: PropTypes.string.isRequired,

  }

  render() {

    if (!this.props.content) return (
      <Container>
        <Spinner/>
      </Container>
    )

    const {
      onSelect,
      contentId,
      content: {
        title,
        type
      },
      connectDropTarget,
      connectDragSource
    } = this.props
    return connectDragSource(connectDropTarget(
      <div
        ref={ref => this.dragRef = ref}
        style={{
          width: "100%",
          height: "100px",
          margin: "10px 0"
        }}
      >
        <Container
          onClick={() => onSelect(contentId)}
        >
          <H3>
            {title}
          </H3>
          <H4>
            {type}
          </H4>
        </Container>
      </div>
    ))
  }

}



const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid blue;
  background-color: yellow;
  box-sizing: border-box;
`

const dragSpec = {
  beginDrag(props, monitor, component) {
    return {
      id: props.content.id,
      index: props.index
    }
  }
}


function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


const dropSpec = {
  hover(props, monitor, component) {
    let dragItem = monitor.getItem()
    let hoverItem = props

    if (dragItem.index === hoverItem.index) {
      return
    }

    // Determine rectangle on screen

    const hoverBoundingRect = component.dragRef.getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Dragging downwards
    if (dragItem.index < hoverItem.index && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragItem.index > hoverItem.index && hoverClientY > hoverMiddleY) {
      return
    }

    props.onReorder(dragItem.index, hoverItem.index)

    monitor.getItem().index = hoverItem.index

  }
}

function dropCollect(connect, monitor){
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

let Wrapped = EditContentThumb

Wrapped = DropTarget("content", dropSpec, dropCollect)(Wrapped)

Wrapped = DragSource("content", dragSpec, dragCollect)(Wrapped)

export default Wrapped
