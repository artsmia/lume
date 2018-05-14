import React, {Component} from 'react'
import styled from 'styled-components'
import {Search} from '../../mia-ui/forms'
import {Button} from '../../mia-ui/buttons'
import {Link } from '../../mia-ui/links'
import {Label, CheckboxInput} from '../../mia-ui/forms'
import Router from 'next/router'
import {H3, H2, H4} from '../../mia-ui/text'
import {Flex, Box} from 'grid-styled'
import {Drawer, DrawerCheck, DrawerButton, DrawerPage} from '../../mia-ui/drawer'
import {GridList, Tile as StoryTile} from '../../mia-ui/lists'
import {Loading} from '../../mia-ui/loading'
import Head from '../../shared/head'
import ImgSrcProvider from '../../shared/ImgSrcProvider'
import Joyride from 'react-joyride'


let Tile = ImgSrcProvider(StoryTile)

const GroupImg = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`

const GroupImage = ImgSrcProvider(GroupImg)

export default class Home extends Component {


  constructor(props){
    super(props)

    const {
      search,
      template
    } = this.props.router.query

    this.state = {
      drawer: false,
      search: search || "",
      template: template ? template.split(',') : ["original","slider"],
      selectedGroupIds: [],
      showGrandTour: false,
      grandTourIndex: 0,
      grandTourSteps: [
        {
          target: 'body',
          content: (
            <div>
              <h2>Welcome to Lume!</h2>
              <p>Thanks for taking the grand tour!</p>
              <p>First off, let's take a look at some of the stories we've created at the Minneapolis Institute of Art.</p>
              <Button
                onClick={()=>{this.setState(({grandTourIndex})=>({grandTourIndex: grandTourIndex + 1}))}}
              >Next</Button>
            </div>
          ),
          placement: "center",
          disableBeacon: true,

        },
        {
          target: '#results',
          content: (
            <div>
              <p>
                An organization's published stories appear here, on the organization's main page.
              </p>
              <Button
                onClick={()=>{this.setState(({grandTourIndex})=>({grandTourIndex: grandTourIndex + 1}))}}
              >
                Next
              </Button>
            </div>
          ),
          disableBeacon: true
        },
        {
          target: '#drawer-button',
          content: (
            <div>
              <p>To search for specific stories or to filter the kinds of stories you see, open up the drawer on the left by clicking the button.</p>
              <Button
                onClick={()=>{
                  this.setState(
                    ()=>({drawer: true}),
                    ()=>{
                      setTimeout(
                        ()=> {
                          this.setState(({grandTourIndex})=>({grandTourIndex: grandTourIndex + 1}))
                        },
                        250
                      )
                    }
                  )

                }}
              >
                Next
              </Button>
            </div>
          ),
          disableBeacon: true,
        },
        {
          target: '#drawer',
          content: (
            <div>
              <p>You can search for specific stories by title or keyword...</p>
              <Button
                onClick={
                  ()=>{
                    this.searchChange({target: {
                      name: 'search',
                      value: 'horse'
                    }})
                    this.setState(
                      ({grandTourIndex})=>({
                        grandTourIndex: grandTourIndex + 1,
                    }))
                  }
                }
              >
                Next
              </Button>
            </div>
          ),
          disableBeacon: true,
          placement: 'right-start'

        },
        {
          target: '#drawer',
          content: (
            <div>
              <p>You can also filter stories based on their type or group.</p>
              <p>(We'll check out the difference between Object Stories and Thematic Stories in a second!)</p>
              <Button
                onClick={()=>{this.setState(({grandTourIndex})=>({grandTourIndex: grandTourIndex + 1}))}}
              >
                Next
              </Button>
            </div>
          ),
          disableBeacon: true,
          placement: 'right-start'

        }
      ]
    }
  }

  handleTourCallback = (tourState) => {
    console.log(tourState)

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
        organization,
        organization: {
          customAnalyticsEnabled,
          customAnalyticsId
        }
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

        <Head
          title={organization.name}
          analyticsId={customAnalyticsEnabled ? customAnalyticsId : false}
        />
        {/* <DrawerCheck/> */}
        <DrawerButton
          id={'drawer-button'}
          open={this.state.drawer}
          onClick={()=>{this.setState( ({drawer})=>({drawer: !drawer})) }}
        />


        {this.renderGroupStuff()}


        <DrawerPage
          onScroll={handleScroll}
          id={'results'}
          open={this.state.drawer}
        >
          <GridList>
            {stories ? stories.map( ({id, previewImage, title, slug}) => (
              <Tile
                key={id}
                w={[1,1, 1/2, 1/4]}
                p={1}
                key={id}
                text={title}
                height={'200px'}
                image={previewImage}
                href={{
                  pathname: '/lume/story',
                  query: {
                    storySlug: slug,
                    subdomain: organization.subdomain
                  }
                }}
                as={`/${organization.subdomain}/${slug}`}
                link={true}
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

        <Joyride
          run={false}
          steps={this.state.grandTourSteps}
          callback={this.handleTourCallback}
          stepIndex={this.state.grandTourIndex}
          styles={{
            buttonClose:{
              display: 'none'
            },
            buttonNext: {
              display: 'none'
            },
            buttonBack: {
              display: 'none'
            }
          }}
        />
      </Flex>
    )
  }

  renderGroupStuff = () => {
    if (this.props.groupSlug){

      let groups = []

      this.props.organization.categories.forEach( category => {
        category.groups.forEach( group => {
          groups.push(group)
        })
      })

      let group = groups.find(group => group.slug === this.props.groupSlug)
      return (
        <Drawer
          open={this.state.drawer}
          id={'drawer'}
        >
          <Flex
            flexWrap={"wrap"}
            w={1}
            p={3}
          >
            <Box
              mb={6}
            >
              <Link
                href={{
                  pathname: '/lume',
                  query: {
                    subdomain: this.props.router.query.subdomain
                  }
                }}
                as={`/${this.props.router.query.subdomain}`}
              >
                  Back to all stories

              </Link>
            </Box>
            <Box
              width={1}
              mb={5}
            >
              <H2>{group.title}</H2>
            </Box>
            <Box
              width={1}
              mb={5}
            >
              {group.description}
            </Box>

            <Box
              width={1}
            >
              <GroupImage
                image={group.image}
              />
            </Box>

          </Flex>
        </Drawer>

      )
    } else {
      return (


          <Drawer
            open={this.state.drawer}
            id={'drawer'}
          >

            <Box
              width={1}
              p={3}
            >
              <H2>{this.props.organization ? this.props.organization.name : 'Art Stories'}</H2>
            </Box>

            <Box
              width={1}
              p={3}
            >
              <Search
                name={"search"}
                value={this.state.search}
                onChange={this.searchChange}
                onKeyPress={this.handleEnter}
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
                checked={this.state.template.includes("original")}
                label={"Object Stories"}
                onChange={this.handleCheck}
              />

              <CheckboxInput
                name={"slider"}
                checked={this.state.template.includes("slider")}
                label={"Thematic Stories"}
                onChange={this.handleCheck}
              />

            </Box>
            <Box
              p={3}
              width={1}
            >
              {this.props.organization ? this.props.organization.categories.map( category => (
                <Flex
                  key={category.id}
                  width={1}
                  flexDirection={'column'}
                >
                  <H3>
                    {category.title}
                  </H3>
                  {category ? category.groups.map( group => (
                    <Flex
                      key={group.id}
                    >
                      <CheckboxInput
                        name={"selectedGroups"}
                        value={group.id}
                        checked={this.state.selectedGroupIds.includes(group.id)}
                        onChange={this.handleGroupCheck}
                        label={(
                          <Link
                            href={{
                              pathname: '/lume',
                              query: {
                                subdomain: this.props.router.query.subdomain,
                                groupSlug: group.slug
                              }
                            }}
                            as={`/${this.props.router.query.subdomain}/group/${group.slug}`}
                          >
                            {group.title}
                          </Link>
                        )}
                      />
                    </Flex>
                  )):null}
                </Flex>
              )):null}
            </Box>


          </Drawer>

        )

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

  componentDidMount(){
    console.log("OrganizationHome did mount")
    // this.setState({
    //   showGrandTour: true
    // })
  }

}
