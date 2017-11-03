import React, {Component} from 'react'
import styled from 'styled-components'
import {Table, Header, Row, Cell, Body} from '../../ui/tables'
import {Link} from '../../ui/links'
import {Button} from '../../ui/buttons'
import router from 'next/router'
import PropTypes from 'prop-types'
import Image from '../Image'
import KeyboardArrowDown from '../../ui/icons/KeyboardArrowDown'
import KeyboardArrowUp from '../../ui/icons/KeyboardArrowUp'


export default class BrowseBooks extends Component {

  static propTypes = {
    newBook: PropTypes.func.isRequired,
    orgSub: PropTypes.string.isRequired,
    data: PropTypes.object
  }

  state = {
    order: {
      column: "updatedAt",
      direction: "ASC"
    }
  }

  render() {

    if (this.props.data.loading) return null

    const {
      handleNewBook,
      handleLoadMore,
      props: {
        orgSub,
        data: {
          books
        }
      },
      state: {
        order,
      }
    } = this
    return (
      <Centered>
        <Button
          onClick={handleNewBook}
        >
          Create Thematic Story
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
                <KeyboardArrowUp
                  onClick={()=>handleArrowClick({
                    column: "title",
                    direction: "DESC"
                  })}
                  fill={(order.column === "title" && order.direction === "DESC") ? "black" : "grey"}
                />
                <KeyboardArrowDown
                  onClick={()=>handleArrowClick({
                    column: "title",
                    direction: "ASC"
                  })}
                  fill={(order.column === "title" && order.direction === "ASC") ? "black" : "grey"}
                />
              </Cell>
              <Cell
                width={"130px"}
              >
                Last Update
                <KeyboardArrowUp
                  onClick={()=>handleArrowClick({
                    column: "updatedAt",
                    direction: "ASC"
                  })}
                  fill={(order.column === "updatedAt" && order.direction === "ASC") ? "black" : "grey"}
                />
                <KeyboardArrowDown
                  onClick={()=>handleArrowClick({
                    column: "updatedAt",
                    direction: "DESC"
                  })}
                  fill={(order.column === "updatedAt" && order.direction === "DESC") ? "black" : "grey"}
                />
              </Cell>
            </Row>
          </Header>
          <Body>
            {books.map( ({id: bookId, title, previewImage, updatedAt}) => (
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
                <Cell
                  width={"130px"}
                >
                  {new Date(updatedAt).toLocaleDateString()}
                </Cell>
              </Row>
            ))}
            <Button
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          </Body>
        </Table>

      </Centered>
    )
  }

  handleLoadMore = async () => {
    try {

      const {
        props: {
          data: {
            fetchMore,
             books
          }
        },
        state: {
          order,
          search
        }
      } = this

      fetchMore({
        variables: {
          filter: {
            limit: 10,
            offset: books.length,
            order: (order.column) ? order : undefined
          },
          search
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) { return previousResult }

          return Object.assign({}, previousResult, {
            books: [...previousResult.books, ...fetchMoreResult.books]
          })
        },
      })
    } catch (ex) {
      console.error(ex)
    }
  }

  handleArrowClick = ({column, direction}) => {
    this.setState(({order}) => {

      if (
        order.column === column &&
        order.direction === direction
      ) {
        return {
          order: {
            column: "",
            direction: ""
          }
        }
      } else {
        return {
          order: {
            column,
            direction
          }
        }
      }
    })
  }


  componentDidUpdate(prevProps, prevState){



    if (
      prevState.order.column !== this.state.order.column ||
      prevState.order.direction !== this.state.order.direction
    ) {
      this.props.data.refetch({
        search: this.state.search,
        filter: {
          order: this.state.order,
          limit: 10
        }
      })
    }
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
