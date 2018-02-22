import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean, number, select } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

import {
  Span,
  H1,
  H2,
  H3,
  H4,
  H5,
  P,
  Time,
  Hr
} from '../components/text'

const props = () => ({
  children: text('children', "Mia loves Lume!"),
  bold: boolean('bold', false),
  light: boolean('light', false),
  uppercase: boolean('uppercase', false),
  lowercase: boolean('lowercase', false),
  align: select('align', {
    left: 'left',
    right: 'right',
    center: 'center',
    'justify': 'justify'
  }, 'left'),
})



storiesOf('Text', module)
  .add(
    'H1',
    withInfo(`
      textual element
    `)(() => (
      <H1
        {...props()}
      />
    ))
  )
  .add(
    'H2',
    withInfo(`
      textual element
    `)(() => (
      <H2
        {...props()}
      />
    ))
  )
  .add(
    'H3',
    withInfo(`
      textual element
    `)(() => (
      <H3
        {...props()}
      />
    ))
  )
  .add(
    'H4',
    withInfo(`
      textual element
    `)(() => (
      <H4
        {...props()}
      />
    ))
  )
  .add(
    'H5',
    withInfo(`
      textual element
    `)(() => (
      <H5
        {...props()}
      />
    ))
  )
  .add(
    'Span',
    withInfo(`
      textual element
    `)(() => (
      <Span
        {...props()}
      />
    ))
  )
  .add(
    'P',
    withInfo(`
      textual element
    `)(() => (
      <P
        {...props()}
      />
    ))
  )
  .add(
    'Time',
    withInfo(`
      textual element
    `)(() => (
      <Time
        {...props()}
      />
    ))
  )
  .add(
    'Hr',
    withInfo(`
      textual element
    `)(() => (
      <Hr
        {...props()}
      />
    ))
  )
