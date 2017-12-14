import React, {Component} from 'react'
import styled from 'styled-components'
import {Table, Header, Row, Cell, Body} from '../../ui/tables'
import {Link} from '../../ui/links'
import {Button} from '../../ui/buttons'
import PropTypes from 'prop-types'
import Image from '../../shared/Image'
import {Spinner} from '../../ui/spinner'


export default class StoryList extends Component {

  static defaultProps = {
    stories: []
  }

  static propTypes = {
    subdomain: PropTypes.string.isRequired,
    stories: PropTypes.array.isRequired,
  }

  state = {
    variables: this.props.variables
  }


  render() {
    const {
      handleLoadMore,
      handleVariableChange,
      props: {
        stories,
        subdomain
      },
      state: {
        variables
      }
    } = this

    return (


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
              onVariablesChange={handleVariableChange}
            />
            {
              (stories) ? (
                <Body>
                  {stories.map(
                    ({
                      mainImage,
                      id: storyId,
                      title,
                      updatedAt,
                    }) => (
                    <Row
                      key={storyId}
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
                            pathname: "/cms/edit",
                            query: {
                              subdomain,
                              storyId
                            }
                          }}
                          as={`/${subdomain}/cms/${storyId}`}
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

    )
  }

  handleLoadMore = async () => {
    try {

      const {
        props: {
          fetchMore,
          stories
        },
        state: {
          variables
        }
      } = this

      let newVariables = variables

      newVariables.filter.offset = stories.length

      fetchMore({
        variables: newVariables,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) { return previousResult }

          return Object.assign({}, previousResult, {
            stories: [...previousResult.stories, ...fetchMoreResult.stories]
          })
        },
      })
    } catch (ex) {
      console.error(ex)
    }
  }

  handleVariableChange = (variables) => {
    this.setState({variables})
    this.props.refetch(variables)
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
