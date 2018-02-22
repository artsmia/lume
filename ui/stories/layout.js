import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean, number, select } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

import {
  Column,
  Row
} from '../components/layout'



storiesOf('Layout', module)
  .add(
    'Row with Columns',
    withInfo(`
      something here
    `)(() => (
      <Row>
        <Column>
          First
        </Column>
        <Column>
          Second
        </Column>
        <Column>
          Third
        </Column>
      </Row>
    ))
  )
