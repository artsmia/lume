const createOrganization = `
  createOrganization(
    subdomain: String!
    name: String!
    creatorId: ID!
  ): Organization
`

export default createOrganization
