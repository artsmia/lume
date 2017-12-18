import React from 'react'
import {Label, Input, Textarea} from '../../ui/forms'

export const DefaultInput = (props) => (
  <div>
    <Label>
      {props.label}
    </Label>
    <Input
      {...props}
    />
  </div>
)


export const DefaultTextarea = (props) => (
  <div
    key={name}
  >
    <Label>
      {name}
    </Label>
    <Textarea
      {...props}
    />
  </div>
)
