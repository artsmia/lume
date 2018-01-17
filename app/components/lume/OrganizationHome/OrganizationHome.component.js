import React, {Component} from 'react'
import styled from 'styled-components'
import {Search} from '../../ui/search'
import {Button} from '../../ui/buttons'
import Link from 'next/link'
import Image from '../../shared/Image'
import {Label, Checkbox} from '../../ui/forms'
import Router from 'next/router'
import {H3} from '../../ui/h'

export default class Home extends Component {

  state = {
    filter: this.props.variables.filter,
  }

  render() {

    if (!this.props.stories) return null

    const {
      props: {
        stories,
        subdomain
      },
      state: {
        filter
      },
      searchChange,
      handleSearch,
      handleLoadMore,
      handleCheck,
      handleScroll
    } = this

    return (

      <Container>
        <SideBar>
          <SearchRow>
            <Search
              name={"search"}
              value={filter.search}
              onChange={searchChange}
            />
          </SearchRow>

          <Options>

            <Checkbox
              name={"original"}
              checked={filter.template.includes("original")}
              label={"Original"}
              onChange={handleCheck}
            />

            <Checkbox
              name={"slider"}
              checked={filter.template.includes("slider")}
              label={"Slider"}
              onChange={handleCheck}
            />
          </Options>
        </SideBar>
        <Results
          id={'results'}
          onScroll={handleScroll}
        >
          {stories.map( ({id, previewImage, title}) => (
            <Story
              key={id}
              id={id}
              imageId={(previewImage) ? previewImage.id : undefined}
              subdomain={subdomain}
              title={title}
            />
          ))}
          <MoreRow>
            {(
              stories.length % 20 === 0 && stories.length > 0) ? (
              <Button
                onClick={handleLoadMore}
              >
                More
              </Button>
            ): null}
            {(stories.length === 0) ? (
              <H3>
                No stories match that search
              </H3>
            ): null}
          </MoreRow>


        </Results>

      </Container>
    )
  }

  componentWillReceiveProps(nextProps){
    this.refetchWithNextProps(nextProps)


  }


  refetchWithNextProps = (nextProps) => {
    const {
      refetch,
      search,
      template
    } = nextProps.url.query

    if (refetch){
      this.props.refetch({
        filter: {
          ...this.state.filter,
          search,
          template: template.split(',')
        }
      })
    }

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


  handleScroll = () => {
    this.debounce(
      () => {
        let results = document.getElementById('results')

        if (
          results.scrollTop + results.clientHeight >= results.scrollHeight - 300
        ) {
          this.handleLoadMore()
        }
      },
      1000
    )
  }

  searchChange = ({target: {value, name}}) => {
    this.setState(
      ({filter: oldFilter}) => {
        let filter = {
          ...oldFilter
        }

        filter.search = value

        return {
          filter
        }
      },
      ()=>{
        this.debounce(this.changeUrl, 2000)
      }
    )
  }

  changeUrl = () => {

    const {
      filter
    } = this.state

    Router.replace(
      {
        pathname: '/lume',
        query: {
          refetch: true,
          subdomain: this.props.subdomain,
          search: filter.search,
          template: filter.template.join(',')
        }
      },
      this.queryString(),
      {shallow: true}
    )

  }

  queryString = () => {

    const {
      filter
    } = this.state

    let base = `/${this.props.subdomain}?`

    let queries = []

    let keepInUrl = ['search', 'template']

    for (let key in filter) {
      if (
        keepInUrl.includes(key)
      ) {
        queries.push(`${key}=${filter[key]}`)
      }
    }

    return base.concat(queries.join('&'))
  }

  handleCheck = ({target: {checked, name}}) => {
    this.setState(
      ({filter: oldFilter}) => {
        let filter = {
          ...oldFilter
        }

        if (
          checked &&
          !filter.template.includes(name)
        ) {
          filter.template.push(name)
        } else if(
          !checked &&
          filter.template.includes(name)
        ) {
          filter.template = filter.template.filter( val => val !== name )
        }

        return {
          filter
        }
      },
      this.changeUrl
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
          filter
        }
      } = this

      let newVariables = {
        filter: {
          ...filter,
          limit: filter.limit,
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
  overflow: hidden;
`

const Results = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: fles-start;
  align-items: flex-start;
  overflow-y: scroll;
`

const MoreRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 30px;
`

const SideBar = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction:column;
  align-items:flex-start;
  padding: 20px;
  border-right: 1px solid lightgrey;
`

const SearchRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Options = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
