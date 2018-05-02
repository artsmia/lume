import React, {Component} from 'react'
import styled from 'styled-components'
import {TabContainer, TabHeader, Tab, TabBody} from '../../mia-ui/tabs'
import Tombstone from './Tombstone'
import Zoomer, {StoryZoomer} from '../../shared/Zoomer'
import ContentDisplaySwitcher from '../../contents/DisplaySwitcher'
import {Button} from '../../mia-ui/buttons'
import {Icon} from '../../mia-ui/icons'
import Link from 'next/link'
import Markdown from 'react-markdown'
import AdditionalImages from './AdditionalImages'
import AdditionalMedias from './AdditionalMedias'

import {Flex, Box} from 'grid-styled'
import {Expander} from '../../mia-ui/expanders'
import {H3} from '../../mia-ui/text'
import Head from '../../shared/head'


export default class OriginalTemplate extends Component {


  constructor(props){
    super(props)


    let selectedContent = {
      id: ''
    }


    if (props.router.query.state1 && props.story.contents){
      selectedContent = props.story.contents.find(content => content.index === parseInt(props.router.query.state1))
    } else {
      selectedContent = props.story.contents.find(content => content.type === "obj") || props.story.contents[0]
    }

    this.state = {
      ...this.state,
      selectedContent,
      selectedTab: this.props.router.query.state0 || 'about',

    }
  }


  render() {

    if (this.props.story.contents.length < 1){
      return (
        <Container
          w={1}
        >

        </Container>
      )
    }

    const {
      state: {
        selectedTab,
        selectedContent
      },
      props: {
        story,
        router,
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
      handleContentSelection,
      createMoreGeometry,
      selectTabAbout,
      selectTabDetails,
      selectTabMore
    } = this

    let objContent = story.contents.find(content => content.type === 'obj')

    let firstDetailContent = story.contents.find(content => content.type === 'detail')


    let firstContent = objContent || story.contents[0]

    let otherContents = story.contents.slice().filter(content => content.id !== firstContent.id)

    let obj = false

    if (objContent) {
      if (objContent.obj){
        obj = objContent.obj
      }
    }

    return (
      <Container
        w={1}
      >
        <Head
          title={story.title}
          analyticsId={customAnalyticsEnabled ? customAnalyticsId : false}
        />
        <SideContainer
          w={1/3}
          flexWrap={'wrap'}
          p={1}
        >
          <Box
            w={1}
          >
            <Button
              onClick={()=>router.back()}
              round
            >
              <Icon
                color={"white"}
                icon={"arrow_back"}
              />
            </Button>
          </Box>


          {(obj) ? (
            <Tombstone
              obj={obj}
            />
          ): null}

          <TabContainer
            selectedTab={selectedTab}
          >
            <TabHeader>
              <Tab
                name={"about"}
                onClick={selectTabAbout}
              >
                About
              </Tab>
              <Tab
                name={"details"}
                onClick={selectTabDetails}
              >
                Details
              </Tab>
              <Tab
                name={"more"}
                onClick={selectTabMore}
              >
                More
              </Tab>
            </TabHeader>
            <TabBody
              name={"about"}
            >

              <Box
                p={3}
              >
                <Markdown
                  source={objContent ? objContent.description : ""}
                />
              </Box>
            </TabBody>
            <TabBody
              name={"details"}
            >
              {otherContents.map( (content) => (
                <Expander
                  key={content.id}
                  open={(selectedContent.id === content.id)}
                  onRequestOpen={()=>{handleContentSelection(content)}}
                  onRequestClose={()=>{this.setState({
                    selectedContent: {
                      type: 'all'
                    }
                  })}}
                  header={
                    <H3>
                      {content.title}
                    </H3>
                  }
                  icon={
                    <Button
                      round
                    >
                      <IndexSpan>
                        {content.index}

                      </IndexSpan>
                    </Button>
                  }
                >
                  <Flex
                    flexWrap={'wrap'}
                  >
                    <Box
                      w={1}
                      p={3}
                    >
                      <Markdown
                        source={content.description}
                      />
                    </Box>

                      <Flex
                        w={1}
                        p={3}
                      >
                        <AdditionalImages
                          additionalImages={content.additionalImages}
                          organization={organization}
                        />
                        <AdditionalMedias
                          additionalMedias={content.additionalMedias}
                          organization={organization}
                        />

                      </Flex>






                  </Flex>

                </Expander>
              ))}
            </TabBody>
            <TabBody
              name={"more"}
            >
              <Flex
                flexWrap={'wrap'}
              >
                {story.relatedStories.map(story => (
                  <Link
                    href={{
                      pathname: '/lume/story',
                      query: {
                        subdomain,
                        storySlug: story.slug
                      }
                    }}
                    as={`/${subdomain}/${story.slug}`}
                    key={story.id}
                  >
                    <RelatedStoryBox
                      w={1}
                      my={2}
                      mx={1}
                      p={2}
                    >
                      {story.title}
                    </RelatedStoryBox>
                  </Link>
                ))}
              </Flex>
            </TabBody>
          </TabContainer>
        </SideContainer>
        <FeatureContainer
          w={[2/3]}
        >

          {this.showFeature(firstDetailContent)}
        </FeatureContainer>
      </Container>
    )
  }



  selectTabAbout=()=>{
    let objContent = this.props.story.contents.find(content => content.type === 'obj')

    this.setState({
      selectedTab: "about",
      selectedContent: objContent
    })

    const {
      query: {
        subdomain,
        storySlug,
        state0,
      },
      replace,
      pathname
    } = this.props.router

    if(pathname === '/lume/story'){
      this.props.router.replace({
        pathname: '/lume/story',
        query: {
          subdomain,
          storySlug,
          state0: 'about'
        },
      }, `/${subdomain}/${storySlug}`)
    }



  }

  selectTabDetails = () => {
    let objContent = this.props.story.contents.find(content => content.type === 'obj')

    this.setState({
      selectedTab: "details",
      selectedContent: {
        id: '',
        type: 'all',
      },
    })

    const {
      query: {
        subdomain,
        storySlug,
        state0,
      },
      replace,
      pathname
    } = this.props.router

    if(pathname === '/lume/story'){
      this.props.router.replace({
        pathname: '/lume/story',
        query: {
          subdomain,
          storySlug,
          state0: 'details'
        },
      }, `/${subdomain}/${storySlug}/details`)
    }


  }

  selectTabMore= () => {
    let objContent = this.props.story.contents.find(content => content.type === 'obj')

    this.setState({
      selectedTab: "more",
      selectedContent: objContent
    })

    const {
      query: {
        subdomain,
        storySlug,
        state0,
      },
      replace,
      pathname
    } = this.props.router

    if(pathname === '/lume/story'){
      this.props.router.replace({
        pathname: '/lume/story',
        query: {
          subdomain,
          storySlug,
          state0: 'more'
        },
      }, `/${subdomain}/${storySlug}/more`)
    }

  }


  showFeature = (firstDetailContent) => {

    const {
      selectedContent
    } = this.state

    if (
      selectedContent.type !== 'detail' &&
      selectedContent.type !== 'all'
    ){
      return (
        <ContentDisplaySwitcher
          content={selectedContent}
        />
      )
    }

    if (
      selectedContent.type === 'detail' ||
      selectedContent.type === 'all'
    ) {
      return (
        <StoryZoomer
          mode={'content'}
          storyId={this.props.story.id}
          selectedContentId={selectedContent.id}
          onContentSelection={this.handleContentSelection}
        />
      )
    }



    //
    // if (
    //   selectedContent.type === "obj" &&
    //   selectedContent.obj.primaryImage
    // ) {
    //   Object.assign(zoomerProps, {
    //     imageId: selectedContent.obj.primaryImage.id,
    //     onContentSelection: this.handleContentSelection,
    //
    //   })
    // }
    //
    // if (
    //   selectedContent.type === "all" &&
    //   firstDetailContent.image0
    // ) {
    //   Object.assign(zoomerProps, {
    //     imageId: firstDetailContent.image0.id,
    //     moreGeometry: this.createMoreGeometry(),
    //     onContentSelection: this.handleContentSelection,
    //   })
    // }
    //
    // if (
    //   selectedContent.type === 'detail' &&
    //   selectedContent.image0
    // ) {
    //   Object.assign(zoomerProps, {
    //     imageId: selectedContent.image0.id,
    //     geometry: selectedContent.geometry,
    //     moreGeometry: this.createMoreGeometry(),
    //     onContentSelection: this.handleContentSelection,
    //     zoom: true
    //   })
    // }
    //
    // return (
    //   <Zoomer
    //     {...zoomerProps}
    //   />
    // )

  }


  // createMoreGeometry = () => {
  //
  //   const {
  //     state: {
  //       selectedContent
  //     },
  //     props: {
  //       story
  //     }
  //   } = this
  //
  //   if (
  //     selectedContent.type === "detail"
  //   ) {
  //     let more = story.contents.slice().filter(content => {
  //       if (content.type === "detail") {
  //         if (content.image0.id === selectedContent.image0.id) {
  //           return true
  //         }
  //       }
  //       return false
  //     })
  //     return more
  //   }
  //   if (
  //     selectedContent.type === "all"
  //   ) {
  //     let firstDetailContent = story.contents.find(content => content.type === 'detail')
  //     let more = story.contents.slice().filter(content => {
  //       if (content.type === "detail") {
  //         if (content.image0.id === firstDetailContent.image0.id) {
  //           return true
  //         }
  //       }
  //       return false
  //     })
  //     return more
  //   }
  // }

  handleContentSelection = (content) => {
    this.setState({
      selectedContent: content
    })

    const {
      query: {
        subdomain,
        storySlug,
        state0,
      },
      replace,
      pathname
    } = this.props.router

    if(pathname === '/lume/story'){
      this.props.router.replace({
        pathname: '/lume/story',
        query: {
          subdomain,
          storySlug,
          state0: 'details',
          state1: content.index
        },
      }, `/${subdomain}/${storySlug}/details/${content.index}`)
    }


  }


}

const Container = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
`
const SideContainer = styled(Box)`
  height: 100vh;
  max-height: 100vh;
`
const FeatureContainer = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
`

const RelatedStoryBox = styled(Box)`
  border: 1px solid lightgrey;
  font-size: 20px;
  cursor: pointer;
`

const IndexSpan = styled.span`
  font-size: 1.8rem;
  line-height: 1.8rem;
  color: ${({theme}) => theme.color.white};
`
