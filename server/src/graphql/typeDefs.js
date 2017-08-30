const typeDefs = `

  type Book {
    id: ID!
    title: String
    pages: [Page]
    relatedItems: [Item]
  }

  type Clip {
    id: ID!
    title: String
    description: String
    detail: Detail
  }

  type Detail {
    id: ID!
    title: String
    item: Item
    clips: [Clip]
    image: Image
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
    artist: String
    dated: String
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
    index: Int
    book: Book
    image: Image
  }

  type User {
    id: ID!
    email: String
    organizations: [Organization]
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
      newGroupIds: [ID]
    ): Item

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

    editOrCreateDetail(
      id: ID
      title: String
      itemId: ID
      imageId: ID
    ): Detail

    editOrCreateClip(
      id: ID
      title: String
      description: String
      coordinates: String
      detailId: ID
    ): Clip
  }

  input CreateAndAddDetailInput {
    itemId: ID
    imageId: ID
  }

  input ItemInput {
    id: ID
    title: String
    localId: String
    medium: String
    artist: String
    dated: String
    accessionNumber: String
    currentLocation: String
    creditLine: String
    text: String
    type: String
  }


`

export default typeDefs
