import React, {Component} from 'react'
import styled from 'styled-components'
import Zoomer from '../../shared/Zoomer'
import ContentDisplaySwitcher from '../../contents/DisplaySwitcher'
import {H3} from '../../mia-ui/text'
import {Button} from '../../mia-ui/buttons'
import {Icon} from '../../mia-ui/icons'
import router from 'next/router'
import Markdown from 'react-markdown'
import AdditionalImages from '../OriginalTemplate/AdditionalImages'
import {Flex, Box} from 'grid-styled'
import Head from '../../shared/head'


export default class OriginalTemplate extends Component {


  constructor(props){
    super(props)

    let selectedIndex = props.router.query.state0 ? parseInt(props.router.query.state0) - 1 : 0


    this.state = {
      selectedContent: props.story.contents.find(content => content.index === selectedIndex)
    }

  }

  render() {

    const {
      state: {
        selectedContent
      },
      props: {
        story
      },
      slide
    } = this

    return (
      <Container
        w={1}
      >
        <Head
          title={story.title}
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
            <PageContainer
              w={3/4}
            >
              <ContentDisplaySwitcher
                content={selectedContent}
              />
            </PageContainer>
            <PageContainer
              w={1/4}
              p={3}
              flexWrap={'wrap'}
            >
              <TopBox
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
              </TopBox>


              <Box
                w={1}
                my={3}
              >
                <H3>
                  {selectedContent.title}
                </H3>
                <Markdown
                  source={selectedContent.description}
                />
                <AdditionalImages
                  additionalImages={selectedContent.additionalImages}
                />
              </Box>
            </PageContainer>
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

const TopBox = styled(Box)`
  height: 120px;
`

const Container = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
`

const PageButtonContainer = styled(Flex)`
  position: fixed;
  bottom: 15%;
  z-index: 1001;
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

const PageContainer = styled(Flex)`
  height: 100%;
`
