const typeDefs = `

  type SaveStatus {
    synced: Boolean
  }

  type ToolTips {
    show: Boolean
    tips: [Tip]
  }

  type Tip {
    target: String
    content: String
    placement: String
  }

  type Mutation {
    setSaveStatus(synced: Boolean): SaveStatus
  }

  type Query {
    saveStatus: SaveStatus
    toolTips: ToolTips
  }
`

export default typeDefs
