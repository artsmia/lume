import React, {Component} from 'react'
import { gql, graphql, compose } from 'react-apollo'
import Template, {EditContainer, EditTabContainer} from './Template'
import {H2} from '../ui/h'
import {Tab} from '../ui/buttons'
import {Form, Label, Input} from '../ui/forms'
import {Column} from '../ui/layout'
import {Button} from '../ui/buttons'

class EditItem extends Component {

  inputs = ["title", "medium", "artist", "dated", "accessionNumber", "currentLocation", "creditLine", "text"]

  constructor(props){
    super(props)
    this.inputs.forEach( name => {
      this.state = {
        ...this.state,
        [name]: ""
      }
    })
  }


  render() {
    const {
      state,
      inputs,
      change,
      saveItem
    } = this
    return (
      <Template>
        <EditTabContainer>
          <Tab>
            Edit
          </Tab>
          <Tab>
            Preview
          </Tab>
        </EditTabContainer>
        <EditContainer>
          <Form>
            {inputs.map( name => (
              <Column
                key={name}
              >
                <Label>
                  {name}
                </Label>
                <Input
                  name={name}
                  onChange={change}
                  value={state[name]}
                />
              </Column>
            ))}
          </Form>
          <Button
            onClick={saveItem}
          >
            Save Item
          </Button>
        </EditContainer>
      </Template>
    )
  }

  componentWillReceiveProps(newProps){
    this.inputs.forEach( name => {
      this.setState({
        [name]: newProps.data.item[name] || ""
      })
    })
  }

  change = ({target: {name, value}}) => this.setState({[name]: value})

  saveItem = async () => {
    try {
      const {
        state: {
          artist,
          title
        },
        props: {
          data: {
            item: {
              id: itemId
            }
          }
        }
      } = this

      const response = await this.props.editItem({
        variables: {
          itemId,
          artist,
          title
        }
      })

      console.log(response)

    } catch (ex) {
      console.error(ex)
    }
  }

}

const pageData = gql`
  query pageData (
    $itemId: ID!
    $userId: ID
  ) {
    item (id: $itemId) {
      id
      title
      artist
      medium
    }
    user (id: $userId) {
      id
      email
    }
  }
`

const editItem = gql`
  mutation editOrCreateItem (
    $itemId: ID
    $title: String
    $artist: String
  ) {
    editOrCreateItem (
      item: {
        id: $itemId
        title: $title
        artist: $artist
      }
    ) {
      id
      artist
      medium
    }
  }
`

export default compose(
  graphql(pageData, {
    options: ({userId, url: {query: {itemId}}}) => ({
      variables: {
        itemId,
        userId
      }
    })
  }),
  graphql(editItem, {
    name: "editItem",
  })
)(
  EditItem
)
