import React, {Component} from 'react'
import styled from 'styled-components'
import {Search} from '../../ui/search'
import {Button} from '../../ui/buttons'
import Link from 'next/link'
import Image from '../../shared/Image'

export default class Home extends Component {

  state = {
    search: ""
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
          {stories.map( ({id, previewImage}) => (
            <Story
              key={id}
              id={id}
              imageId={(previewImage) ? previewImage.id : undefined}
              subdomain={subdomain}
            />
          ))}
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



}

const Story = ({id, imageId, subdomain}) => (
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
    {(imageId) ? (
      <Image
        imageId={imageId}
        width={"30%"}
        height={"200px"}
        objectFit={"cover"}
      />
    ): <div></div>}
  </Link>
)

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
