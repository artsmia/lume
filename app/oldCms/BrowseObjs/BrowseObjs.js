import React, {Component} from 'react'
import styled from 'styled-components'
import {Table, Header, Row, Cell, Body} from '../../ui/tables'
import {Link} from '../../ui/links'
import {Button} from '../../ui/buttons'
import router from 'next/router'
import PropTypes from 'prop-types'
import Image from '../../shared/Image'
import {Spinner} from '../../ui/spinner'


export default class BrowseObjs extends Component {

  static displayName = "BrowseObjs"

  static propTypes = {
    newObj: PropTypes.func.isRequired,
    orgSub: PropTypes.string.isRequired,
    objs: PropTypes.array.isRequired,
    organization: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }

  state = {
    variables: this.props.variables
  }


  render() {
    const {
      handleNewObj,
      handleLoadMore,
      props: {
        orgSub,
        objs,
      },
      state: {
        variables
      }
    } = this

    return (

        <Centered>

          <Button
            onClick={handleNewObj}
          >
            Create Object Story
          </Button>

          <Table>
            <Header
              hasSearch
              columns={[
                {
                  title: "",
                  width: "100px"
                },
                {
                  title: "Title",
                  column: "title",
                  upDirection: "DESC",
                  downDirection: "ASC"
                },
                {
                  title: "Last Update",
                  column: "updatedAt",
                  upDirection: "ASC",
                  downDirection: "DESC",
                  width: "130px"
                }
              ]}
              variables={variables}
              onVariablesChange={(variables)=>{
                this.setState({variables})
                this.props.refetch(variables)
              }}
            />
            {
              (objs) ? (
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
              ): <Spinner/>
            }
          </Table>

        </Centered>
    )
  }


  handleLoadMore = async () => {
    try {

      const {
        props: {
          fetchMore,
          objs
        },
        state: {
          variables
        }
      } = this

      let newVariables = variables

      newVariables.filter.offset = objs.length
      newVariables.filter.limit = objs.length + 10

      fetchMore({
        variables: newVariables,
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
        organization: {
          id
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


}

const Centered = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  align-items: flex-start;
`
