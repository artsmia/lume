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


  constructor(props){
    super(props)

    const {
      search,
      template
    } = this.props.router.query

    this.state = {
      search: search || "",
      template: template ? template.split(',') : ["original","slider"],
    }
  }

  render() {

    if (!this.props.stories) return null

    const {
      props: {
        stories,
        router: {
          query: {
            subdomain
          }
        }
      },
      state: {
        search,
        template
      },
      searchChange,
      handleCheck,
      handleLoadMore,
      handleScroll
    } = this

    return (

      <Container>
        <SideBar>
          <SearchRow>
            <Search
              name={"search"}
              value={search}
              onChange={searchChange}
            />
          </SearchRow>

          <Options>

            <Checkbox
              name={"original"}
              checked={template.includes("original")}
              label={"Original"}
              onChange={handleCheck}
            />

            <Checkbox
              name={"slider"}
              checked={template.includes("slider")}
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

  searchChange = ({target: {name, value}}) => {
    this.setState(
      ()=>({[name]: value}),
      ()=>{
        this.debounce(this.updateUrl,2000)
      }
    )
  }

  handleCheck = ({target: {checked, name}}) => {
    this.setState(
      (prevState) => {
        let template = prevState.template.slice()
        if (
          checked &&
          !template.includes(name)
        ) {
          template.push(name)
        } else if(
          !checked &&
          template.includes(name)
        ) {
          template = template.filter( val => val !== name )
        }

        return {
          template
        }
      },
      this.updateUrl
    )
  }


  updateUrl = () => {

    const {
      subdomain
    } = this.props.router.query

    const {
      search,
      template
    } = this.state

    let queries = {
      search,
      template
    }

    let queryString = `/${subdomain}?`

    for (let key in queries) {
      queryString = queryString.concat(`${key}=${queries[key]}&`)
    }



    this.props.router.replace(
      {
        pathname: "/lume",
        query: {
          search,
          subdomain,
          template: template.join(',')
        }
      },
      queryString,
      {shallow: true}
    )
  }

  handleLoadMore = async () => {
    try {

      const {
        props: {
          fetchMore,
          stories,
          variables
        },
      } = this

      let newVariables = {
        filter: {
          ...variables.filter,
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
