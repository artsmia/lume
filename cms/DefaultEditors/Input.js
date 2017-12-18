import React from 'react'
import {Label, Input} from '../../ui/forms'


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
