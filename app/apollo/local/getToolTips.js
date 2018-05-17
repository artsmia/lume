import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const tipsQuery = gql`
  query TipsQuery {
    toolTips {
      show
      tips {
        target
        content
        placement
      }
    }
  }
`

const localConfig = {
  props({ ownProps, data }) {
    return {
      ...ownProps,
      ...data
    }
  }
}

export default graphql(tipsQuery, localConfig)
