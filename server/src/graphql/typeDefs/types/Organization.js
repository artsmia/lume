const Organization = `
  type Organization {
    id: ID!
    name: String
    subdomain: String
    emailDomain: String
    stories: [Story]
    users: [User]
    groups: [Group]
    images: [Image]
    videos: [Video]
    newUsersRequireApproval: Boolean
    customObjApiEnabled: Boolean
    customObjApiEndpoint: String
    customImageApiEnabled: Boolean
    customImageEndpoint: String
  }
`

export default Organization
