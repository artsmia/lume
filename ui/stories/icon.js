import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean, number, select } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

import {
  Icon
} from '../components/icon'



storiesOf('Icon', module)
  .add(
    'icon',
    withInfo(`
      something here
    `)(() => (
      <Icon
        children={text('children','face')}
        size={text('size','4rem')}
        color={text('color','blue')}

      />
    ))
  )
