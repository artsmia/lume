const Filter = `
  input Filter {
    limit: Int
    offset: Int
    order: [OrderInput]
    organizationId: ID
    subdomain: String
    search: String
  }

  input OrderInput {
    column: String
    direction: DirectionEnum
  }
`

export default Filter
