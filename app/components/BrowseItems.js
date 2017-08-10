import React, {Component} from 'react'
import Template, {Centered} from '../ui/cms/Template'
import {H2} from '../ui/h'
import {Table, Header, Row, Cell, Body} from '../ui/tables'
import {Link} from '../ui/links'


export default class extends Component {



  render() {
    const {
      props: {
        organization: {
          name,
          subdomain,
          items
        }
      }
    } = this
    console.log(this.props)
    return (
      <Template>
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
                    <Link
                      href={{
                        pathname: "/cms/edit/item",
                        query: {
                          orgSub: subdomain,
                          itemId: item.id
                        }
                      }}
                      as={`/${subdomain}/cms/item/${item.id}`}
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

}
