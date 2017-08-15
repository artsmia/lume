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
    detail: [Detail]
    image: Image
  }

  type Detail {
    id: ID!
    title: String
    item: Item
    clips: [Clip]
    images: [Image]
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
    bucket: String
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

    items: [Item]

    organizations: [Organization]

  }

  type Mutation {
    editOrCreateItem(
      item: ItemInput
      newOrganizationIds: [ID]
      mainImageId: ID
      newRelatedItemIds: [ID]
      newDetailIds: [ID]
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
