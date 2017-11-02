import React, {Component} from 'react'
import styled from 'styled-components'
import {Row, Cell, Body} from '../../ui/tables'
import {Button} from '../../ui/buttons'


export default class Data extends Component {



  render() {

    const {
      props: {
        items
      },
      loadMore
    } = this

    return(
      <Body>
        {(items) ? (
          items.map( ({id, title}) => (
            <Row
              key={id}
            >
              <Cell>
                {title}
              </Cell>
            </Row>
          ))
        ):null}
        <Button
          onClick={loadMore}
        >
          Load More
        </Button>
      </Body>
    )
  }

  loadMore = () => {
    this.props.loadMore()

  }

}
