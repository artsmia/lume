import React, {Component} from 'react'
import MiaUI from '../../../ui'
import CmsTemplate, {Top, Bottom} from '../../../ui/cms/Template'
import {Form, Input, Label} from '../../../ui/forms'
import {Table, Row, Cell, Header, TBody} from '../../../ui/tables'
import apiFetch from '../../../utils/apiFetch'
import {Button} from '../../../ui/buttons'
import ItemPage from '../../../components/ItemPage'

export default class extends Component {

  static getInitialProps = async (context) => {
    try {
      const {itemId} = context.query

      const {item} = await apiFetch(`{
        item (id: "${itemId}") {
          id
          miaId
          title
          text
          detail {
            id
            clips {
              id
              title
              description
            }
          }
          relatedBooks {
            id
            title
          }
        }
      }`)


      return {
        item,
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  constructor(props){
    super(props)
    this.state = {
      title: props.item.title
    }
  }

  render() {
    const {
      handleChange,
      saveItem,
      props,
      state: {
        title
      }
    } = this
    return (
      <MiaUI>
        <CmsTemplate>
          <Top>
            <Form>
              <Label>Title</Label>
              <Input
                name={"title"}
                value={title}
                onChange={handleChange}
              />
            </Form>
            <Button
              onClick={saveItem}
            >
              Save Item
            </Button>
          </Top>
          <Bottom>
            <ItemPage
              {...props}
            />

          </Bottom>


        </CmsTemplate>
      </MiaUI>
    )
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]:value})

  saveItem = async () => {
    try {
      const {
        id
      } = this.props.item
      const {
        title
      } = this.state

      const response = await apiFetch(`mutation {
        editOrCreateItem(
          id: "${id}"
          title: "${title}"
        ) {
          id
        }
      }`)
      const json = await response.json()
    } catch (ex) {

    }
  }


}
