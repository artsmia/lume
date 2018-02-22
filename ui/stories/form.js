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
} from '../components/form'


const labelProps = () => ({
  children: text('children', "Mia loves Lume!"),
  bold: boolean('bold', false),
  light: boolean('light', false),
  uppercase: boolean('uppercase', false),
  lowercase: boolean('lowercase', false),
})


storiesOf('Form', module)
  .add(
    'Input',
    withInfo(`
      something here
    `)(() => (
      <Form>
        <Label
          {...labelProps()}
        >
          Label
        </Label>
        <Input/>
      </Form>
    ))
  )
  .add(
    'Search',
    withInfo(`
      something here
    `)(() => (
      <Form>
        <Search
          focus={boolean('focus', true)}
        />
      </Form>
    ))
  )
  .add(
    'TextInput',
    withInfo(`
      something here
    `)(() => (
      <Form>
        <TextInput
          label={"Hello"}
          placeholder={"places"}
        />
        <TextInput
          label={"Hello"}
          placeholder={"places"}
        />
      </Form>
    ))
  )
  .add(
    'TextareaInput',
    withInfo(`
      something here
    `)(() => (
      <Form>
        <TextareaInput
          label={"Hello"}
          placeholder={"places"}
        />
        <TextareaInput
          label={"Hello"}
          placeholder={"places"}
        />
      </Form>
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
          placeholder={"places"}
        />
        <CheckboxInput
          label={"Hello"}
          placeholder={"places"}
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
          Select with Options:
        </Label>
        <Select
        >
          <Option
            value={1}
          >
            First
          </Option>
          <Option
            value={2}
          >
            Two
          </Option>
        </Select>
      </Form>
    ))
  )
