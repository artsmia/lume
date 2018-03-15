import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean, number, select } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

import {
  Form,
  Input,
  Label,
  Search,
  TextInput,
  TextareaInput,
  CheckboxInput,
  Select,
  Option
} from '../forms'


const labelProps = () => ({
  bold: boolean('bold', false),
  light: boolean('light', false),
  uppercase: boolean('uppercase', false),
  lowercase: boolean('lowercase', false),
})


storiesOf('Form', module)
  .add(
    'Label',
    withInfo(`
      something here
    `)(() => (
      <Label
        {...labelProps()}
      >
        {text('label','Some Input')}
      </Label>
    ))
  )
  .add(
    'Search',
    withInfo(`
      something here
    `)(() => (
      <Search
        focus={boolean('focus', true)}
      />
    ))
  )
  .add(
    'TextInput',
    withInfo(`
      something here
    `)(() => (
      <TextInput
        label={text('label','Email')}
        placeholder={text('placeholder','Email Address')}
      />
    ))
  )
  .add(
    'TextareaInput',
    withInfo(`
      something here
    `)(() => (
      <TextareaInput
        label={text('label','About You')}
        placeholder={text('placeholder','Tell us about yourself ')}
        minHeight={text('minHeight','')}
        width={text('width','')}

      />
    ))
  )
  .add(
    'CheckboxInput',
    withInfo(`
      something here
    `)(() => (
      <Form>
        <CheckboxInput
          label={"Hello"}
          placeholder={text('label','Vegan')}
        />
        <CheckboxInput
          label={"Hello"}
          placeholder={text('label','Gluten Free')}
        />
      </Form>
    ))
  )
  .add(
    'Select and Options',
    withInfo(`
      something here
    `)(() => (
      <Form>
        <Label>
          {text('label','Select with Options')}
        </Label>
        <Select
        >
          <Option
            value={1}
          >
            {text('Option 1','One')}
          </Option>
          <Option
            value={2}
          >
            {text('Option 1','Two')}
          </Option>
        </Select>
      </Form>
    ))
  )
