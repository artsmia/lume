const typeDefs = `

  type Book {
    id: ID!
    previewImage: Image
    title: String
    pages: [Page]
    relatedItems: [Item]
    visibility: VisibilityEnum
    updatedAt: String
  }


  type Detail {
    id: ID!
    title: String
    item: Item
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
    items: [Item]
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


  type Item {
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
    relatedItems: [Item]
    details: [Detail]
    relatedBooks: [Book]
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
    items: [Item]
    users: [User]
    groups: [Group]
    books: [Book]
    images: [Image]
    role: RoleEnum
    newUsersRequireApproval: Boolean
    customItemApiEnabled: Boolean
    customItemApiEndpoint: String
    customImageApiEnabled: Boolean
    customImageEndpoint: String
  }

  type Page {
    id: ID!
    title: String
    text: String
    type: String
    index: Int
    book: Book
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

    book (
        id: ID!
    ): Book

    books (
      filter: Filter
      search: String
      orgSub: String
    ): [Book]

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

    item (
      id: ID!
    ): Item


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

    items (
      orgSub: String
      search: String
      filter: Filter
    ): [Item]

    organizations: [Organization]

  }

  type Mutation {

    editOrCreateItem(
      item: ItemInput
      newOrganizationIds: [ID]
      mainImageId: ID
      newRelatedItemIds: [ID]
      createAndAddDetail: CreateAndAddDetailInput
      newRelatedBookIds: [ID]
      removeRelatedBookIds: [ID]
      newGroupIds: [ID]
    ): Item

    editOrCreateBook(
      id: ID
      title: String
      newOrganizationIds: [ID]
      previewImageId: ID
      createAndAddPage: CreateAndAddPageInput
    ): Book


    editOrCreateOrganization(
      id: ID
      name: String
      subdomain: String
      emailDomain: String
      newUserIds: [ID]
      customItemApiEnabled: Boolean
      customItemApiEndpoint: String
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
      itemId: ID
      imageId: ID
      index: Int
      newAdditionalImageIds: [ID]
      removeAdditionalImageIds: [ID]
      geometry: GeometryInput
    ): Detail


    deleteItem(
      id: ID!
    ): DeleteMessage

    deleteBook(
      id: ID!
    ): DeleteMessage

    deletePage(
      id: ID!
    ): Book

    deleteDetail(
      id: ID!
    ): Item

  }

  input CreateAndAddDetailInput {
    itemId: ID
    imageId: ID
  }

  input CreateAndAddPageInput {
    bookId: ID
  }

  input ComparisonImageInput {
    id: ID
    index: Int
  }

  input ItemInput {
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
