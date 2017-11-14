import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-link-http'
import {apiUrl} from '../config'


const config = {
  link: new HttpLink({
    uri: apiUrl,
  })
}

console.log(apiUrl)

export default withData(config)
