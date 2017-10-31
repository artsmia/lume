import { graphql, compose } from 'react-apollo'
// import Zoomer from './GoogleZoomer'
import Zoomer from './Zoomer'
import ImageQuery from './query.graphql'

const queryConfig = {
  options: ({imageId = "", detailId = "", itemId = ""}) => ({
    variables: {
      imageId,
      detailId,
      itemId
    },
  })
}


const query = graphql(ImageQuery, queryConfig)




export default compose(
  query,
)(
  Zoomer
)
