import React, {Component} from 'react'
import apiFetch from '../../utils/apiFetch'
import BookPage from '../../components/BookPage'

export default class extends Component {

  static getInitialProps = async (context) => {
    try {
      const {bookId, pageIndex} = context.query
      const {book} = await apiFetch(`{
        book (id: "${bookId}") {
          id
          title
          pages {
            id
            index
            title
            text
          }
        }
      }`)


      return {
        book,
        pageIndex: parseInt(pageIndex, 10)
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    const {
      props
    } = this
    return (
      <BookPage
        {...props}
      />
    )
  }
}
