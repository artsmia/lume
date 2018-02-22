import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean, number, select } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

import {
  Icon
} from '../components/icons'



storiesOf('Icon', module)
  .add(
    'icon',
    withInfo(`
      Must have link to fonticon stylesheet


      Icon list is here: https://material.io/icons/

      Icons are material design font icons.
    `)(() => (
      <Icon
        size={text('size','4rem')}
        color={text('color','blue')}
        icon={text('icon', 'face')}
      />

    ))
  )
