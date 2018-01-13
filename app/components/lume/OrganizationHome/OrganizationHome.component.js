import React, {Component} from 'react'
import styled from 'styled-components'
import {Search} from '../../ui/search'
import {Button} from '../../ui/buttons'
import Link from 'next/link'
import Image from '../../shared/Image'

export default class Home extends Component {

  state = {
    search: "",
    variables: this.props.variables
  }

  render() {

    if (!this.props.stories) return null

    const {
      props: {
        stories,
        subdomain
      },
      state: {
        search
      },
      handleChange,
      handleSearch,
      handleLoadMore
    } = this

    return (

      <Container>
        <SearchBar>
          <Search
            name={"search"}
            value={search}
            onChange={handleChange}
          />
          <Button
            onClick={handleSearch}
          >
            Search
          </Button>
        </SearchBar>

        <Results>
          {stories.map( ({id, previewImage, title}) => (
            <Story
              key={id}
              id={id}
              imageId={(previewImage) ? previewImage.id : undefined}
              subdomain={subdomain}
              title={title}
            />
          ))}
          <Button
            onClick={handleLoadMore}
          >
            More
          </Button>
        </Results>

      </Container>
    )
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  handleSearch = () => {
    this.props.refetch({
      filter: {
        ...this.props.variables.filter,
        search: this.state.search
      }
    })
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

const Story = ({id, imageId, subdomain, title}) => (
  <Link
    href={{
      pathname: '/lume/story',
      query: {
        storyId: id,
        subdomain
      }
    }}
    as={`/${subdomain}/story/${id}`}
  >
    <AWrap>

    {(imageId) ? (
      <Image
        imageId={imageId}
        height={"200px"}
          width={"300px"}
        objectFit={"cover"}
        title={title}
      />
    ): <div></div>}
  </AWrap>

  </Link>
)

const AWrap = styled.a`
  cursor: pointer;
  display: flex;
`

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`

const Results = styled.div`
  max-width: 70%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`

const SearchBar = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction:row;
  align-items:flex-start;
  padding: 20px;
`
