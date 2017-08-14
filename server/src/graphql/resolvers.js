import Item from './root/Item'
import item from './queries/item'
import items from './queries/items'
import editOrCreateItem from './mutations/editOrCreateItem'

const resolvers = {
  Query: {
    item,
    items
  },
  Mutation: {
    editOrCreateItem,
  },
  Item,
}

export default resolvers
