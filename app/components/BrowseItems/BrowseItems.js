import React, {Component} from 'react'
import Template from '../CMSTemplate'
import {Centered} from '../CMSTemplate/Template'
import {H2} from '../../ui/h'
import {Table, Header, Row, Cell, Body} from '../../ui/tables'
import {Link} from '../../ui/links'
import {Button} from '../../ui/buttons'
import router from 'next/router'
import PropTypes from 'prop-types'

export default class BrowseItems extends Component {

  static propTypes = {
    newItem: PropTypes.func,
    orgSub: PropTypes.string,
    data: PropTypes.object
  }

  render() {

    if (this.props.data.loading) return null

    const {
      handleNewItem,
      props: {
        orgSub,
        data: {
          items
        }
      }
    } = this
    return (
      <Template
        {...this.props}
      >
        <Centered>
          <Button
            onClick={handleNewItem}
          >
            New Item
          </Button>
          <Table>
            <Header>
              <Row>
                <Cell>
                  Title
                </Cell>
                <Cell>
                  id
                </Cell>
              </Row>
            </Header>
            <Body>
              {items.map( item => (
                <Row
                  key={item.id}
                >
                  <Cell>
                    <Link
                      href={{
                        pathname: "/cms/edit/item",
                        query: {
                          orgSub,
                          itemId: item.id
                        }
                      }}
                      as={`/${orgSub}/cms/item/${item.id}`}
                    >
                      {item.title}
                    </Link>
                  </Cell>
                  <Cell>
                    {item.id}
                  </Cell>
                </Row>
              ))}
            </Body>
          </Table>

        </Centered>
      </Template>
    )
  }

  handleNewItem = async () => {
    try {
      const {
        newItem,
        orgSub,
        data: {
          organization: {
            id
          }
        }
      } = this.props

      const {data: {editOrCreateItem: item}} = await newItem({
        variables: {
          newOrganizationIds: [id]
        }
      })
      router.push({
        pathname: '/cms/edit/item',
        query: {
          orgSub,
          itemId: item.id
        }
      }, `/${orgSub}/cms/item/${item.id}`)
    } catch (ex) {
      console.error(ex)
    }
  }

}
