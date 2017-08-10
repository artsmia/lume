import React, {Component} from 'react'
import Template, {Centered} from '../ui/cms/Template'
import {H2} from '../ui/h'

export default class extends Component {



  render() {
    const {
      props: {
        organization: {
          name
        }
      }
    } = this
    return (
      <Template>
        <Centered>
          <H2>
            {name}
          </H2>
        </Centered>
      </Template>
    )
  }

}
