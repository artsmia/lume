import Query from './queries'
import Mutation from './mutations'
import Root from './root'


const resolvers = {
  Query,
  Mutation,
  ...Root
}


export default resolvers
