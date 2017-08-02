import React, {Component} from 'react'
import styled from 'styled-components'
import Link from './Link'

export default class BookPage extends Component {
  render() {
    const {
      props: {
        pageIndex,
        book: {
          title,
          pages
        }
      },
      page,
      nextPage
    } = this
    return (
      <Container>

        <Viewer>
          <h2>{title}</h2>
          <h4>{pageIndex + 1} of {pages.length}</h4>
        </Viewer>

        <Column>
          {page}
          {nextPage}
        </Column>
      </Container>
    )
  }

  get page(){
    const {
      pageIndex,
      book: {
        pages
      }
    } = this.props

    const page = pages.find( (page) => {
      return page.index === pageIndex
    })

    return (
      <div
        dangerouslySetInnerHTML={{__html: page.text}}
      />
    )

  }

  get nextPage() {
    const {
      pageIndex,
      book: {
        id,
        pages
      }
    } = this.props

    const page = pages.find( (page) => {
      return page.index === pageIndex
    })

    let nextPage = pageIndex + 1

    if (nextPage >= pages.length) {
      return (
        <h3>All Done</h3>
      )
    } else {
      return (
        <Link
          href={{
            pathname: '/live/book',
            query: {
              bookId: id,
              pageIndex: nextPage
            }
          }}
          as={`/book/${id}/${nextPage}`}
        >
          <h3>
            Next Page
          </h3>
        </Link>
      )
    }

  }


}


export const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  height: 100%;
  width: 100%;
`

export const Viewer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70%;
  min-width: 300px;
  padding: 20px;
`


export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30%;
  min-width: 300px;
  max-width: 400px;
  padding: 20px;
`
