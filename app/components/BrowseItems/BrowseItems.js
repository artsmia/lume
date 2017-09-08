import React, {Component} from 'react'
import Template from '../Template'
import styled from 'styled-components'
import {Table, Header, Row, Cell, Body} from '../../ui/tables'
import {Link} from '../../ui/links'
import {Button} from '../../ui/buttons'
import router from 'next/router'
import PropTypes from 'prop-types'
import Image from '../Image'

export default class BrowseItems extends Component {

  static propTypes = {
    newItem: PropTypes.func,
    orgSub: PropTypes.string.isRequired,
    data: PropTypes.object
  }

  static defaultProps = {
    data: {
      items: []
    }
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
                <Cell
                  width={"100px"}
                >
                  Thumb
                </Cell>
                <Cell>
                  Title
                </Cell>
              </Row>
            </Header>
            <Body>
              {items.map( ({mainImage, id: itemId, title}) => (
                <Row
                  key={itemId}
                >
                  <Cell
                    width={"100px"}
                  >
                    <Image
                      imageId={(mainImage) ? mainImage.id : false}
                      size={"50px"}
                      thumb
                    />
                  </Cell>
                  <Cell>
                    <Link
                      href={{
                        pathname: "/cms/edit/item",
                        query: {
                          orgSub,
                          itemId: itemId
                        }
                      }}
                      as={`/${orgSub}/cms/item/${itemId}`}
                    >
                      {title}
                    </Link>
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

const Centered = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  align-items: flex-start;
`
