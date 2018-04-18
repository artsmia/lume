const typeDefs = `

  type SaveStatus {
    synced: Boolean
  }

  type Mutation {
    setSaveStatus(synced: Boolean): SaveStatus
  }

  type Query {
    saveStatus: SaveStatus
  }
`

export default typeDefs
