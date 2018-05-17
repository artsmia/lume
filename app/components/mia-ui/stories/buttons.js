import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean, number, select } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'
import { colorList } from '../colors'

import { Button } from '../buttons'
import { Icon } from '../icons'

let colorSelect = {
  none: ''
}

colorList.forEach(color => {
  Object.assign(colorSelect, {
    [color]: color
  })
})

const props = () => ({
  a: boolean('a', false),
  display: select(
    'display',
    {
      block: 'block',
      'inline-block': 'inline-block'
    },
    'inline-block'
  ),
  color: select('color', colorSelect, 'black'),
  round: boolean('round', false),
  children: text('children', 'Hello')
})

storiesOf('Buttons', module)
  .add(
    'Button',
    withInfo(`
      something here
    `)(() => <Button {...props()} />)
  )
  .add(
    'Button w/ Icon',
    withInfo(`
      something here
    `)(() => (
      <Button a round color={select('button color', colorSelect, 'black')}>
        <Icon color={text('icon color', 'white')} />
      </Button>
    ))
  )
