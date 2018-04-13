import React, {Component} from 'react'
import styled from 'styled-components'
import {Search} from '../../mia-ui/forms'
import {Button} from '../../mia-ui/buttons'
import Link from 'next/link'
import {Label, CheckboxInput} from '../../mia-ui/forms'
import Router from 'next/router'
import {H3, H2, H4} from '../../mia-ui/text'
import {Flex, Box} from 'grid-styled'
import {Drawer, DrawerCheck, DrawerButton, DrawerPage} from '../../mia-ui/drawer'
import {GridList, Tile} from '../../mia-ui/lists'
import getImageSrc from '../../../utils/getImageSrc'
import {Loading} from '../../mia-ui/loading'

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
      selectedGroupIds: []
    }
  }

  render() {

    if (!this.props.stories || !this.props.organization) return <Loading/>

    const {
      props: {
        stories,
        router: {
          query: {
            subdomain
          }
        },
        organization
      },
      state: {
        search,
        template,
        selectedGroupIds
      },
      searchChange,
      handleCheck,
      handleGroupCheck,
      handleLoadMore,
      handleScroll,
      handleEnter
    } = this

    return (
      <Flex
        width={1}
      >
        <DrawerCheck/>
        <DrawerButton/>
        <Drawer>

          <Box
            width={1}
            p={3}
          >
            <H2>Art Stories</H2>
          </Box>

          <Box
            width={1}
            p={3}
          >
            <Search
              name={"search"}
              value={search}
              onChange={searchChange}
              onKeyPress={handleEnter}
            />
          </Box>
          <Box
            width={1}
            p={3}
          >
            <H3>
              Story Type
            </H3>

            <CheckboxInput
              name={"original"}
              checked={template.includes("original")}
              label={"Object Stories"}
              onChange={handleCheck}
            />

            <CheckboxInput
              name={"slider"}
              checked={template.includes("slider")}
              label={"Thematic Stories"}
              onChange={handleCheck}
            />

            {organization ? organization.categories.map( category => (
              <Flex
                key={category.id}
                width={1}
                p={3}
              >
                <H3>
                  {category.title}
                </H3>
                {category ? category.groups.map( group => (
                  <Box
                    key={group.id}
                  >
                    <CheckboxInput
                      name={"selectedGroups"}
                      value={group.id}
                      checked={selectedGroupIds.includes(group.id)}
                      onChange={handleGroupCheck}
                    />
                    {group.title}
                  </Box>
                )):null}
              </Flex>
            )):null}
          </Box>




        </Drawer>

        <DrawerPage>
          <GridList>
            {stories ? stories.map( ({id, previewImage, title}) => (
              <Tile
                key={id}
                width={[1,1, 1/2, 1/4]}
                key={id}
                text={title}
                height={'200px'}
                src={getImageSrc({
                  image: previewImage,
                  organization,
                  quality: 'm'
                })}
                href={{
                  pathname: '/lume/story',
                  query: {
                    storyId: id,
                    subdomain: organization.subdomain
                  }
                }}
                as={`/${organization.subdomain}/story/${id}`}
              />
            )): null}
          </GridList>
          <Box>
            {(
              stories.length % 30 === 0 && stories.length > 0) ? (
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
          </Box>
        </DrawerPage>
      </Flex>
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

  handleEnter = ({keyCode}) => {
    if (keyCode === 0){
      this.updateUrl()
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

  handleGroupCheck = ({target: {checked, name, value}}) => {
    this.setState(
      ({selectedGroupIds}) => {
        let groups = selectedGroupIds.slice()
        if (
          groups.includes(value)
        ) {
          groups = groups.filter(id => id !== value)
          return {
            selectedGroupIds:groups
          }
        } else {
          groups.push(value)
          return {
            selectedGroupIds: groups
          }
        }
      },
      this.updateUrl
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
      template,
      selectedGroupIds: groups
    } = this.state

    let queries = {
      search,
      template,
      groups
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
          template: template.join(','),
          groups: groups.join(',')
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
          variables,
        },
      } = this

      if (
        stories.length % 30 === 0
        && stories.length > 0
      ) {
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
      }


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
