const Filter = `
  input Filter {
    limit: Int
    offset: Int
    order: [OrderInput]
    orgSub: String
    search: String
  }

  input OrderInput {
    column: String
    direction: DirectionEnum
  }
`

export default Filter
