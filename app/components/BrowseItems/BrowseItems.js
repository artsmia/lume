import React, {Component} from 'react'
import styled from 'styled-components'
import {Table, Header, Row, Cell, Body} from '../../ui/tables'
import {Link} from '../../ui/links'
import {Button} from '../../ui/buttons'
import router from 'next/router'
import PropTypes from 'prop-types'
import Image from '../Image'
import {Loading} from '../../ui/spinner'
import {Search} from '../../ui/search'
import Svg from '../../ui/icons/Svg'
import KeyboardArrowDown from '../../ui/icons/KeyboardArrowDown'
import KeyboardArrowUp from '../../ui/icons/KeyboardArrowUp'


export default class BrowseItems extends Component {

  static propTypes = {
    newItem: PropTypes.func.isRequired,
    orgSub: PropTypes.string.isRequired,
    data: PropTypes.object
  }

  state = {
    search: "",
    order: {}
  }


  render() {

    if (
      !this.props.data.items
    ) return <Loading/>

    const {
      handleNewItem,
      handleChange,
      handleSearch,
      handleArrowClick,
      props: {
        orgSub,
        data: {
          items
        }
      },
      state: {
        search,
        order
      }
    } = this

    return (

        <Centered>

          <Button
            onClick={handleNewItem}
          >
            New Item
          </Button>

          <Search
            onChange={handleChange}
            name={"search"}
            value={search}
          />
          <Button
            onClick={handleSearch}
          >
            Search
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
              {items.map( ({mainImage, id: itemId, title, updatedAt}) => (
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
                  <Cell
                    width={"130px"}
                  >
                    {new Date(updatedAt).toLocaleDateString()}
                  </Cell>
                </Row>
              ))}
            </Body>
          </Table>

        </Centered>
    )
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

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  handleSearch = () => {
    const {
      search,
      order
    } = this.state

    this.props.data.refetch({
      search,
      filter: {
        limit: 10,
        order
      }
    })
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
