import React, {Component} from 'react'
import styled from 'styled-components'
import {Table, Header, Row, Cell, Body} from '../../ui/tables'
import {Link} from '../../ui/links'
import {Button} from '../../ui/buttons'
import router from 'next/router'
import PropTypes from 'prop-types'
import Image from '../../shared/Image'
import {Loading} from '../../ui/spinner'
import {Search} from '../../ui/search'
import KeyboardArrowDown from '../../ui/icons/KeyboardArrowDown'
import KeyboardArrowUp from '../../ui/icons/KeyboardArrowUp'


export default class BrowseObjs extends Component {

  static propTypes = {
    newObj: PropTypes.func.isRequired,
    orgSub: PropTypes.string.isRequired,
    data: PropTypes.object
  }

  state = {
    search: "",
    order: {
      column: "updatedAt",
      direction: "DESC"
    }
  }


  render() {

    if (
      !this.props.data.objs
    ) return <Loading/>

    const {
      handleNewObj,
      handleChange,
      handleSearch,
      handleArrowClick,
      handleLoadMore,
      props: {
        orgSub,
        data: {
          objs
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
            onClick={handleNewObj}
          >
            Create Object Story
          </Button>

          <Row>
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
          </Row>



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
              {objs.map( ({mainImage, id: objId, title, updatedAt}) => (
                <Row
                  key={objId}
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
                        pathname: "/cms/edit/obj",
                        query: {
                          orgSub,
                          objId: objId
                        }
                      }}
                      as={`/${orgSub}/cms/obj/${objId}`}
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
              <Button
                onClick={handleLoadMore}
              >
                Load More
              </Button>
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

  handleLoadMore = async () => {
    try {

      const {
        props: {
          data: {
            fetchMore,
             objs
          }
        },
        state: {
          order,
          search
        }
      } = this

      fetchMore({
        variables: {
          filter: {
            limit: 10,
            offset: objs.length,
            order: (order.column) ? order : undefined
          },
          search
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) { return previousResult }

          return Object.assign({}, previousResult, {
            objs: [...previousResult.objs, ...fetchMoreResult.objs]
          })
        },
      })
    } catch (ex) {
      console.error(ex)
    }
  }

  handleNewObj = async () => {
    try {
      const {
        newObj,
        orgSub,
        data: {
          organization: {
            id
          }
        }
      } = this.props

      const {data: {editOrCreateObj: obj}} = await newObj({
        variables: {
          newOrganizationIds: [id]
        }
      })

      router.push({
        pathname: '/cms/edit/obj',
        query: {
          orgSub,
          objId: obj.id
        }
      }, `/${orgSub}/cms/obj/${obj.id}`)
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
