const editDetail = `
  editDetail(
    id: ID!
    emailDomain: String
    newUserIds: [ID]
    customObjApiEnabled: Boolean
    customObjApiEndpoint: String
  ): Detail
`

export default editDetail
