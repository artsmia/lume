import React, {Component} from 'react'
import styled from 'styled-components'
import {Table, HeaderRow, HeaderCell, BodyRow, BodyCell, TableThumb, Sorter} from '../../mia-ui/tables'
import {Link, NextA} from '../../mia-ui/links'
import {Button} from '../../mia-ui/buttons'
import PropTypes from 'prop-types'
import getImageSrc from '../../../utils/getImageSrc'
import {Search} from '../../mia-ui/forms'
import {Box} from 'grid-styled'

export default class StoryList extends Component {

  static defaultProps = {
    stories: []
  }

  static propTypes = {
    stories: PropTypes.array.isRequired,
  }

  state = {
    variables: this.props.variables,
  }


  render() {
    const {
      handleLoadMore,
      handleSort,
      handleSearch,
      props: {
        stories,
        router: {
          query: {
            subdomain
          }
        },
        organization,
      },
      state: {
        variables
      }
    } = this

    return (
      <Table>
        <Box>
          <Search
            value={variables.filter.search || ""}
            name={"search"}
            onChange={handleSearch}
          />
        </Box>
        <HeaderRow>
          <HeaderCell
            width={[1/3,1/6]}
          >

          </HeaderCell>
          <HeaderCell
            width={[1/3, 1/3]}
          >
            Title
            <Sorter
              variables={variables}
              column={'title'}
              upValue={'ASC'}
              downValue={'DESC'}
              onSort={handleSort}
            />
          </HeaderCell>
          <HeaderCell
            width={[0,1/5]}
          >
            Template
          </HeaderCell>
          <HeaderCell
            width={[1/6,1/6]}
          >
            Updated
            <Sorter
              variables={variables}
              column={'updatedAt'}
              upValue={'ASC'}
              downValue={'DESC'}
              onSort={handleSort}
            />
          </HeaderCell>
        </HeaderRow>

        {stories ? stories.map(({
          id: storyId,
          previewImage,
          title,
          updatedAt,
          template,
          slug: storySlug
        }) => (
          <BodyRow
            key={storyId}
          >
            <BodyCell
              width={[1/3,1/6]}
            >
              {previewImage ? (
                <NextA
                  href={{
                    pathname: "/cms/edit",
                    query: {
                      subdomain,
                      storySlug
                    }
                  }}
                  as={`/cms/${subdomain}/${storySlug}`}
                >
                  <TableThumb
                    src={getImageSrc({
                      image: previewImage,
                      organization,
                      quality: 's'
                    })}
                  />
                </NextA>
              ):null}
            </BodyCell>
            <BodyCell
              width={[1/3, 1/3]}
            >
              <Link
                href={{
                  pathname: "/cms/edit",
                  query: {
                    subdomain,
                    storySlug
                  }
                }}
                as={`/cms/${subdomain}/${storySlug}`}
              >
                {title || 'Untitled Story'}
              </Link>
            </BodyCell>
            <BodyCell
              width={[0,1/5]}
            >
              {template}
            </BodyCell>
            <BodyCell
              width={[1/6,1/6]}
            >
              {new Date(updatedAt).toLocaleDateString()}
            </BodyCell>
          </BodyRow>
        )):null}

      </Table>


    )
  }

  bounce = true

  debounce = (func, wait) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(
        func,
        wait
      )
    }
  }

  handleSearch = ({target: {name, value}}) => {
    this.setState(
      ({variables: oldVariables}) => {
        let variables = {...oldVariables}
        variables.filter.search = value
        return {
          variables
        }
      },
      ()=>{
        this.debounce(
          ()=>this.props.refetch(this.state.variables),
          2000
        )
      }
    )
  }

  handleSort = ({column, newValue}) => {
    this.setState(
      (prevState) => {
        let variables = {...this.props.variables}

        for (let [index, order] of variables.filter.order.entries()){
          if (order.column === column){
            variables.filter.order.splice(index,1)
            variables.filter.order.unshift({
              column,
              direction: newValue
            })
            return {
              variables
            }
          }


        }

        variables.filter.order.unshift({
          column,
          direction: newValue
        })


        return {
          variables
        }

      },
      ()=>{
        this.props.refetch(this.state.variables)
      }
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

      let newVariables = {
        filter: {
          ...variables.filter,
          limit: variables.filter.limit,
          offset: this.props.stories.length,
        }
      }

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

}
