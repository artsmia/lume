import React, { Component } from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const BinDiv = styled.div`
  height: 200px;
  width: 200px;
  background-color: ${({backgroundColor}) => backgroundColor};
`

const boxTarget = {
  drop() {
    console.log("drop")
    return { name: 'Dustbin' };
  },
};

function boxCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

class Dustbin extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
  };

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = '#222';
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return connectDropTarget(
      <div>
        <BinDiv
          backgroundColor={backgroundColor}
        >
          {isActive ?
            'Release to drop' :
            'Drag a box here'
          }
        </BinDiv>
      </div>,
    );
  }
}

export default DropTarget(ItemTypes.BOX, boxTarget, boxCollect)(Dustbin)
