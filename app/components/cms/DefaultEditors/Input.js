import React from 'react'
import {Label, Input} from '../../ui/forms'
import {Column} from '../../ui/layout'

export default (props) => (
  <div>
    <Label>
      {props.label}
    </Label>
    <Input
      {...props}
    />
  </div>
)
