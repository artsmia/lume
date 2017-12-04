const typeDefs = `

  type Thematic {
    id: ID!
    previewImage: Image
    title: String
    pages: [Page]
    relatedObjs: [Obj]
    visibility: VisibilityEnum
    updatedAt: String
  }


  type Detail {
    id: ID!
    title: String
    obj: Obj
    image: Image
    index: Int
    additionalImages: [Image]
    geometry: Geometry
    description: String
  }

  type Group {
    id: ID!
    title: String
    text: String
    objs: [Obj]
    image: Image
    organizations: [Organization]
  }

  type Image {
    id: ID!
    organization: Organization
    title: String
    alt: String
    localId: String
    metadata: String
    host: HostEnum
    gdriveId: String
    s3Bucket: String
    index: Int
  }


  type Obj {
    id: ID!
    title: String
    localId: String
    medium: String
    dimensions: String
    attribution: String
    date: String
    culture: String
    accessionNumber: String
    currentLocation: String
    creditLine: String
    text: String
    type: String
    visibility: VisibilityEnum
    mainImage: Image
    relatedObjs: [Obj]
    details: [Detail]
    relatedThematics: [Thematic]
    groups: [Group]
    organizations: [Organization]
    details: [Detail]
    pullFromCustomApi: Boolean
    updatedAt: String
  }

  type Organization {
    id: ID!
    name: String
    subdomain: String
    emailDomain: String
    objs: [Obj]
    users: [User]
    groups: [Group]
    thematics: [Thematic]
    images: [Image]
    role: RoleEnum
    newUsersRequireApproval: Boolean
    customObjApiEnabled: Boolean
    customObjApiEndpoint: String
    customImageApiEnabled: Boolean
    customImageEndpoint: String
  }

  type Page {
    id: ID!
    title: String
    text: String
    type: String
    index: Int
    thematic: Thematic
    mainImage: Image
    video: String
    comparisonImage0: Image
    comparisonImage1: Image
  }

  type User {
    id: ID!
    email: String
    organizations: [Organization]
    role: RoleEnum
  }

  type Geometry {
    type: GeoEnum!
    coordinates: [[[Float]]]
  }


  enum HostEnum {
    s3
    gdrive
  }

  enum RoleEnum {
    admin
    editor
    contributor
    pending
  }

  enum VisibilityEnum {
    draft
    published
  }

  enum GeoEnum {
    Point
    Polygon
    LineString
  }

  type DeleteMessage {
    message: String
  }

  type Query {

    thematic (
        id: ID!
    ): Thematic

    thematics (
      filter: Filter
      search: String
      orgSub: String
    ): [Thematic]

    detail (
        id: ID!
    ): Detail

    group (
        id: ID!
    ): Group

    image (
        id: ID!
    ): Image

    images (
      filter: Filter
      search: String
      orgSub: String
    ): [Image]

    obj (
      id: ID!
    ): Obj


    organization (
      id: ID
      orgSub: String
    ): Organization

    page (
        id: ID!
    ): Page

    user (
        id: ID
    ): User

    objs (
      orgSub: String
      search: String
      filter: Filter
    ): [Obj]

    organizations: [Organization]

  }

  type Mutation {

    editOrCreateObj(
      obj: ObjInput
      newOrganizationIds: [ID]
      mainImageId: ID
      newRelatedObjIds: [ID]
      createAndAddDetail: CreateAndAddDetailInput
      newRelatedThematicIds: [ID]
      removeRelatedThematicIds: [ID]
      newGroupIds: [ID]
    ): Obj

    editOrCreateThematic(
      id: ID
      title: String
      newOrganizationIds: [ID]
      previewImageId: ID
      createAndAddPage: CreateAndAddPageInput
    ): Thematic


    editOrCreateOrganization(
      id: ID
      name: String
      subdomain: String
      emailDomain: String
      newUserIds: [ID]
      customObjApiEnabled: Boolean
      customObjApiEndpoint: String
    ): Organization

    editOrCreateImage(
      id: ID
      organizationId: ID
    ): Image

    editOrCreatePage(
      id: ID
      type: String
      title: String
      text: String
      comparisonImage0: ID
      comparisonImage1: ID
      mainImageId: ID
      video: String
      index: Int
    ): Page

    editOrCreateDetail(
      id: ID
      title: String
      description: String
      objId: ID
      imageId: ID
      index: Int
      newAdditionalImageIds: [ID]
      removeAdditionalImageIds: [ID]
      geometry: GeometryInput
    ): Detail


    deleteObj(
      id: ID!
    ): DeleteMessage

    deleteThematic(
      id: ID!
    ): DeleteMessage

    deletePage(
      id: ID!
    ): Thematic

    deleteDetail(
      id: ID!
    ): Obj

  }

  input CreateAndAddDetailInput {
    objId: ID
    imageId: ID
  }

  input CreateAndAddPageInput {
    thematicId: ID
  }

  input ComparisonImageInput {
    id: ID
    index: Int
  }

  input ObjInput {
    id: ID
    title: String
    localId: String
    medium: String
    attribution: String
    dimensions: String
    culture: String
    date: String
    accessionNumber: String
    currentLocation: String
    creditLine: String
    text: String
    type: String
    pullFromCustomApi: Boolean
  }

  input GeometryInput {
    type: GeoEnum!
    coordinates: [[[Float]]]
  }

  input Filter {
    limit: Int
    offset: Int
    order: [OrderInput]
  }

  input OrderInput {
    column: String
    direction: DirectionEnum
  }

  enum DirectionEnum {
    ASC
    DESC
  }

`

export default typeDefs
