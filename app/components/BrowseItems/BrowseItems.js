import React, {Component} from 'react'
import styled from 'styled-components'
import {Table, Header, Row, Cell, Body} from '../../ui/tables'
import {Link} from '../../ui/links'
import {Button} from '../../ui/buttons'
import router from 'next/router'
import PropTypes from 'prop-types'
import Image from '../Image'
import {Loading} from '../../ui/spinner'

export default class BrowseItems extends Component {

  static propTypes = {
    newItem: PropTypes.func.isRequired,
    orgSub: PropTypes.string.isRequired,
    data: PropTypes.object
  }


  render() {

    if (
      this.props.data.loading ||
      !this.props.data.items
    ) return <Loading/>

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

      console.log(item)

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
