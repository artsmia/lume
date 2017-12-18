import React from 'react'
import {Label, Textarea} from '../../ui/forms'


export default (props) => (
  <div>
    <Label>
      {props.label}
    </Label>
    <Textarea
      {...props}
    />
  </div>
)
