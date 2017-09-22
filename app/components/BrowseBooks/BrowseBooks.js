import React, {Component} from 'react'
import styled from 'styled-components'
import {Table, Header, Row, Cell, Body} from '../../ui/tables'
import {Link} from '../../ui/links'
import {Button} from '../../ui/buttons'
import router from 'next/router'
import PropTypes from 'prop-types'
import Image from '../Image'

export default class BrowseBooks extends Component {

  static propTypes = {
    newBook: PropTypes.func.isRequired,
    orgSub: PropTypes.string.isRequired,
    data: PropTypes.object
  }


  render() {

    if (this.props.data.loading) return null

    const {
      handleNewBook,
      props: {
        orgSub,
        data: {
          books
        }
      }
    } = this
    return (
      <Centered>
        <Button
          onClick={handleNewBook}
        >
          New Book
        </Button>
        <Table>
          <Header>
            <Row>
              <Cell
                width={"60px"}
              >

              </Cell>
              <Cell>
                Title
              </Cell>
            </Row>
          </Header>
          <Body>
            {books.map( ({id: bookId, title, previewImage}) => (
              <Row
                key={bookId}
              >
                <Cell
                  width={"60px"}
                >
                  {(previewImage) ? (
                    <Image
                      imageId={previewImage.id}
                      thumb
                      size={"50px"}
                    />
                  ): null}
                </Cell>
                <Cell>
                  <Link
                    href={{
                      pathname: "/cms/edit/book",
                      query: {
                        orgSub,
                        bookId: bookId
                      }
                    }}
                    as={`/${orgSub}/cms/book/${bookId}`}
                  >
                    {title}
                  </Link>
                </Cell>
              </Row>
            ))}
          </Body>
        </Table>

      </Centered>
    )
  }

  handleNewBook = async () => {
    try {
      const {
        newBook,
        orgSub,
        data: {
          organization: {
            id
          }
        }
      } = this.props

      const {data: {editOrCreateBook: book}} = await newBook({
        variables: {
          newOrganizationIds: [id]
        }
      })
      router.push({
        pathname: '/cms/edit/book',
        query: {
          orgSub,
          bookId: book.id
        }
      }, `/${orgSub}/cms/book/${book.id}`)
    } catch (ex) {
      console.error(ex)
    }
  }

}

const Centered = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  align-items: flex-start;
`
