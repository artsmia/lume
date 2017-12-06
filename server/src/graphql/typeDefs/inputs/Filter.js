const Filter = `
  input Filter {
    limit: Int
    offset: Int
    order: [OrderInput]
  }

  input OrderInput {
    column: String
    direction: DirectionEnum
  }
`

export default Filter
