const typeDefs = `

  type Book {
    id: ID!
    previewImage: Image
    title: String
    pages: [Page]
    relatedItems: [Item]
  }

  type Clip {
    id: ID!
    title: String
    description: String
    detail: Detail
    additionalImages: [Image]
    geometry: Geometry
    index: Int
  }

  type Detail {
    id: ID!
    title: String
    item: Item
    clips: [Clip]
    image: Image
    index: Int
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
    mainImage: Image
    relatedItems: [Item]
    details: [Detail]
    relatedBooks: [Book]
    groups: [Group]
    organizations: [Organization]
    details: [Detail]
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
  }

  type Page {
    id: ID!
    title: String
    text: String
    type: String
    index: Int
    book: Book
    mainImage: Image
    comparisonImages: [Image]
    video: String
  }

  type User {
    id: ID!
    email: String
    organizations: [Organization]
  }

  type Geometry {
    type: GeoEnum!
    coordinates: [[[Float]]]
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

    clip (
        id: ID!
    ): Clip

    detail (
        id: ID!
    ): Detail

    group (
        id: ID!
    ): Group

    image (
        id: ID!
    ): Image

    item (
        id: ID!
    ): Item

    organization (
        id: ID
        subdomain: String
    ): Organization

    page (
        id: ID!
    ): Page

    user (
        id: ID
    ): User

    books (
      orgSub: String
      organizationId: ID
      search: String
    ): [Book]

    items (
      orgSub: String
      organizationId: ID
      groupId: ID
      search: String
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
      comparisonImageIds: [ID]
      mainImageId: ID
      video: String
      index: Int
    ): Page

    editOrCreateDetail(
      id: ID
      title: String
      itemId: ID
      imageId: ID
      createAndAddClip: CreateAndAddClipInput
      index: Int
    ): Detail

    editOrCreateClip(
      id: ID
      title: String
      description: String
      geometry: GeometryInput
      detailId: ID
      newAdditionalImageIds: [ID]
      index: Int
    ): Clip


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

    deleteClip(
      id: ID!
    ): Detail
  }

  input CreateAndAddDetailInput {
    itemId: ID
    imageId: ID
  }

  input CreateAndAddPageInput {
    bookId: ID
  }

  input CreateAndAddClipInput {
    detailId: ID
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
  }

  input GeometryInput {
    type: GeoEnum!
    coordinates: [[[Float]]]
  }


`

export default typeDefs
