import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean, number, select } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

import {

} from '../layout'



storiesOf('Layout', module)
  .add(
    'Row with Columns',
    withInfo(`
      something here
    `)(() => (

    ))
  )
