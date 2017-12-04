import React, {Component} from 'react'
import styled from 'styled-components'
import {Table, Header, Row, Cell, Body} from '../../ui/tables'
import {Link} from '../../ui/links'
import {Button} from '../../ui/buttons'
import router from 'next/router'
import PropTypes from 'prop-types'
import Image from '../Image'
import KeyboardArrowDown from '../../ui/icons/KeyboardArrowDown'
import KeyboardArrowUp from '../../ui/icons/KeyboardArrowUp'
import {Search} from '../../ui/search'

export default class BrowseThematics extends Component {

  static propTypes = {
    newThematic: PropTypes.func.isRequired,
    orgSub: PropTypes.string.isRequired,
    data: PropTypes.object
  }

  state = {
    order: {
      column: "updatedAt",
      direction: "ASC"
    },
    search: ""
  }

  render() {

    if (this.props.data.loading) return null

    const {
      handleNewThematic,
      handleLoadMore,
      handleChange,
      handleSearch,
      handleArrowClick,
      props: {
        orgSub,
        data: {
          thematics
        }
      },
      state: {
        order,
        search
      }
    } = this
    return (
      <Centered>
        <Button
          onClick={handleNewThematic}
        >
          Create Thematic Story
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
                width={"60px"}
              >

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
            {thematics.map( ({id: thematicId, title, previewImage, updatedAt}) => (
              <Row
                key={thematicId}
              >
                <Cell
                  width={"60px"}
                >
                  {(previewImage) ? (
                    <Image
                      imageId={previewImage.id}
                      thumb
                      size={"50px"}
                    />
                  ): null}
                </Cell>
                <Cell>
                  <Link
                    href={{
                      pathname: "/cms/edit/thematic",
                      query: {
                        orgSub,
                        thematicId: thematicId
                      }
                    }}
                    as={`/${orgSub}/cms/thematic/${thematicId}`}
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
        order: (order.column) ? order : undefined
      }
    })
  }

  handleLoadMore = async () => {
    try {

      const {
        props: {
          data: {
            fetchMore,
             thematics
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
            offset: thematics.length,
            order: (order.column) ? order : undefined
          },
          search
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) { return previousResult }

          return Object.assign({}, previousResult, {
            thematics: [...previousResult.thematics, ...fetchMoreResult.thematics]
          })
        },
      })
    } catch (ex) {
      console.error(ex)
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


  componentDidUpdate(prevProps, prevState){



    if (
      prevState.order.column !== this.state.order.column ||
      prevState.order.direction !== this.state.order.direction
    ) {
      this.props.data.refetch({
        search: this.state.search,
        filter: {
          order: this.state.order,
          limit: 20
        }
      })
    }
  }

  handleNewThematic = async () => {
    try {
      const {
        newThematic,
        orgSub,
        data: {
          organization: {
            id
          }
        }
      } = this.props

      const {data: {editOrCreateThematic: thematic}} = await newThematic({
        variables: {
          newOrganizationIds: [id]
        }
      })
      router.push({
        pathname: '/cms/edit/thematic',
        query: {
          orgSub,
          thematicId: thematic.id
        }
      }, `/${orgSub}/cms/thematic/${thematic.id}`)
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
