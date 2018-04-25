import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {H3, H4} from '../../mia-ui/text'
import {Waiting} from '../../mia-ui/loading'
// import Image from '../../shared/Image'
import { DragSource, DropTarget } from 'react-dnd'
import {Flex, Box} from 'grid-styled'
import {gray60} from '../../mia-ui/colors'
import {ContentIcon} from '../../mia-ui/icons'
import {ThumbImage, ThumbOverlay, ThumbContainer} from '../../mia-ui/lume'
import imgSrcProvider from '../../shared/ImgSrcProvider'

const Thumb = imgSrcProvider(ThumbImage)

class EditContentThumb extends Component {

  static defaultProps = {
    onSelect: PropTypes.func.isRequired,
    contentId: PropTypes.string.isRequired,

  }

  render() {

    if (!this.props.content) return <Waiting/>

    const {
      onSelect,
      contentId,
      content: {
        title,
        type,
        image0
      },
      selected,
      organization,
      connectDropTarget,
      connectDragSource
    } = this.props

    return connectDragSource(connectDropTarget(
      <div
        ref={ref => this.dragRef = ref}
        style={{
          width: "100%",
          height: "100px",
          marginBottom: "40px"
        }}
      >
        <ThumbContainer
          onClick={() => onSelect(contentId)}
          selected={selected}
        >


          {(image0) ? (
            <Thumb
              image={image0}
            />
          ): null}

          <ThumbOverlay>

            <H4
              color={'white'}
            >
              {title ? title : `Edit your ${type} content`}
            </H4>
            <ContentIcon
              type={type}
            />
          </ThumbOverlay>

        </ThumbContainer>
      </div>
    ))
  }

}




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
