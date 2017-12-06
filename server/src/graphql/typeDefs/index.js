import enums from './enums'
import inputs from './inputs'
import mutations from './mutations'
import queries from './queries'
import types from './types'
import unions from './unions'


const typeDefs = [
  ...enums,
  ...inputs,
  mutations,
  queries,
  ...types,
  ...unions
]

export default typeDefs
