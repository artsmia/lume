import React, {Component} from 'react'
import styled, {css} from 'styled-components'
import ContentDisplaySwitcher from '../../contents/DisplaySwitcher'
import {H3} from '../../mia-ui/text'
import {Button, NavButton} from '../../mia-ui/buttons'
import {Icon} from '../../mia-ui/icons'
import router from 'next/router'
import Markdown from 'react-markdown'
import AdditionalImages from '../OriginalTemplate/AdditionalImages'
import AdditionalMedias from '../OriginalTemplate/AdditionalMedias'

import {Flex, Box} from 'grid-styled'
import Head from '../../shared/head'


export default class OriginalTemplate extends Component {


  constructor(props){
    super(props)

    let selectedIndex = props.router.query.state0 ? parseInt(props.router.query.state0) - 1 : 0


    this.state = {
      selectedContent: props.story.contents.find(content => content.index === selectedIndex),
      drawer: true
    }

  }


  render() {

    const {
      state: {
        selectedContent,
        drawer
      },
      props: {
        story,
        organization,
        organization: {
          customAnalyticsEnabled,
          customAnalyticsId
        },
        router: {
          query: {
            subdomain
          }
        }
      },
      slide
    } = this

    return (
      <Container
        w={1}
      >
        <Head
          title={story.title}
          analyticsId={customAnalyticsEnabled ? customAnalyticsId : false}
        />
        <PageButtonContainer
          w={1}
          justifyContent={'space-between'}
        >
          {(selectedContent.index !== 0) ? (
            <Button
              onClick={() => slide(-1)}
            >
              Back
            </Button>
          ): <div/>}
          {(selectedContent.index < story.contents.length - 1) ? (
            <Button
              onClick={() => slide(1)}
            >
              Forward
            </Button>
          ): <div/>}

        </PageButtonContainer>
        <BookContainer
          flexDirection={'column'}
        >
          <HeaderFooter
            w={1}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <H3
              color={'white'}
            >
              {story.title}
            </H3>
          </HeaderFooter>
          <PageContainer
            w={1}
          >
            <ContentContainer
              w={[1,3/4]}
            >
              <ContentDisplaySwitcher
                content={selectedContent}
              />
            </ContentContainer>
            <DrawerButton
              round
              display={''}
              open={drawer}
              onClick={()=>{this.setState(({drawer}) => ({drawer: !drawer}))}}
            >
              <Icon
                color={'white'}
                icon={'menu'}
              />
            </DrawerButton>
            <SideContainer
              w={[3/4, 1/4]}
              p={3}
              flexWrap={'wrap'}
              open={drawer}
              flexDirection={'column'}
            >
              <TopBox
                w={1}
              >
                <NavButton
                  href={{
                    pathname: '/lume',
                    query: {
                      subdomain
                    }
                  }}
                  size={'40px'}
                  as={`/${subdomain}`}
                  round
                >
                  <Icon
                    color={"white"}
                    icon={"arrow_back"}
                  />
                </NavButton>
              </TopBox>


              <Box
                w={1}
              >
                <H3>
                  {selectedContent.title}
                </H3>
                <Markdown
                  source={selectedContent.description}
                />
                <Flex>
                  <AdditionalImages
                    additionalImages={selectedContent.additionalImages}
                  />
                  <AdditionalMedias
                    additionalMedias={selectedContent.additionalMedias}
                  />
                </Flex>

              </Box>
            </SideContainer>
          </PageContainer>

          <HeaderFooter
            w={1}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <H3
              color={'white'}
            >
              Page {selectedContent.index + 1} of {story.contents.length}
            </H3>
          </HeaderFooter>
        </BookContainer>

      </Container>
    )
  }

  slide = (direction) => {
    const {
      state: {
        selectedContent
      },
      props: {
        story,
        router: {
          query,
          pathname,
          replace
        }
      }
    } = this

    this.setState({selectedContent: story.contents.find(content => content.index === selectedContent.index + direction)})

    if (pathname === '/lume/story'){

      let newIndex = selectedContent.index + direction + 1

      let path = `/${query.subdomain}/${query.storySlug}/${newIndex}`

      if (newIndex === 1){
        path = `/${query.subdomain}/${query.storySlug}`
      }

      replace({
        pathname,
        query: {
          ...query,
          state0: newIndex,
        }
      }, path)
    }

  }

}

const DrawerButton = styled(Button)`
  transition: .2s all;
  visibility: hidden;
  position: absolute;

  @media only screen and (max-width: 40em) {
    visibility: visible;
    height:50px;
    width: 50px;
    z-index: 5000;
    bottom: 10px;
    right: ${({open}) => open ? '78%': '10px'};

  }

`

const TopBox = styled(Box)`
  height: 120px;
`

const Container = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
  max-width: 100vw;
`

const PageButtonContainer = styled(Flex)`
  position: fixed;
  bottom: 25%;
  z-index: 4001;
`
const HeaderFooter = styled(Flex)`
  height: 50px;
  background-color: ${({theme}) => theme.color.black};
`
const BookContainer = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  max-width: 100vw;
`

const ContentContainer = styled(Flex)`
  height: 100%;
  @media only screen and (max-width: 40em) {
    position: absolute;
  }
`

const SideContainer = styled(Flex)`
  height: 100%;
  transition: .2s all;
  @media only screen and (max-width: 40em) {
    position: absolute;
    background-color: white;
    z-index: 4000;
    right: 0;
    ${({open}) => !open ? css`
      transform: translateX(100%);
    ` : null}
  }
`

const PageContainer = styled(Flex)`
  height: 100%;
  position: relative;
  overflow: hidden;
`
