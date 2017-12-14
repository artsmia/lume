const editOrganization = `
  editOrganization(
    id: ID!
    emailDomain: String
    customObjApiEnabled: Boolean
    customObjApiEndpoint: String
  ): Organization
`

export default editOrganization
