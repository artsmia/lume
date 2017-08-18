import React, {Component} from 'react'
import { gql, graphql } from 'react-apollo'
import CMSTemplate from '../CMSTemplate'
import {Centered} from '../CMSTemplate/Template'
import {H2} from '../../ui/h'

export default class Home extends Component {

  render() {

    if (this.props.data.loading) {
      return null
    }
    const {
      props,
      props: {
        data: {
          organization: {
            name
          }
        }
      }
    } = this
    return (
      <CMSTemplate
        {...props}
      >
        <Centered>

        </Centered>
      </CMSTemplate>
    )
  }

}
