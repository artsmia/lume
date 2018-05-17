import React, { Component } from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { text, boolean, number, select } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

import { Modal, Warn } from '../modals'
import { Button } from '../buttons'

const props = () => ({})

class ModalExample extends Component {
  state = {
    modal: false
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ modal: true })}>Open</Button>

        <Modal
          open={this.state.modal}
          onClose={() => this.setState({ modal: false })}
        >
          <div
            style={{
              height: '200px',
              width: '300px'
            }}
          />
        </Modal>
      </div>
    )
  }
}

class WarnExample extends Component {
  state = {
    modal: false
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ modal: true })}>Open</Button>

        <Warn
          open={this.state.modal}
          onClose={() => this.setState({ modal: false })}
        >
          Are you sure?
        </Warn>
      </div>
    )
  }
}

storiesOf('Modal', module)
  .add(
    'Modal',
    withInfo(`
      something here
    `)(() => <ModalExample />)
  )
  .add(
    'Warn',
    withInfo(`
      something here
    `)(() => <WarnExample />)
  )
