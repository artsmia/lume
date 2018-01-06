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
      },
      state: {
        search
      },
      handleChange,
      handleSearch
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

const Story = ({id, imageId}) => (
  <Link
    href={{
      pathname: '/lume/story',
      query: {
        storyId: id
      }
    }}
    as={`/sumbdomain/story/${id}`}
  >
    <Image
      imageId={imageId}
      height={"200px"}
    />
  </Link>
)

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`

const Results = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
`

const SearchBar = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction:column;
  align-items:flex-start;
  padding: 20px;
`
