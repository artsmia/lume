import React, {Component} from 'react'
import { gql, graphql } from 'react-apollo'
import Template from './CMSTemplate'
import {Centered} from './CMSTemplate/Template'
import {H2} from '../ui/h'
import {Table, Header, Row, Cell, Body} from '../ui/tables'
import {Link} from '../ui/links'


class BrowseItems extends Component {



  render() {
    const {
      props: {
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
                    {/* <Link
                      href={{
                        pathname: "/cms/edit/item",
                        query: {
                          orgSub: subdomain,
                          itemId: item.id
                        }
                      }}
                      as={`/${subdomain}/cms/item/${item.id}`}
                    > */}
                      {item.title}
                    {/* </Link> */}
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

}


const items = gql`
  query items {
    items {
      id
      title
    }
  }
`

export default graphql(
  items,
)(
  BrowseItems
)
