import React, {Component} from 'react'
import styled from 'styled-components'
import Zoomer from '../../shared/Zoomer'
import ContentDisplaySwitcher from '../../../contents/DisplaySwitcher'
import {H3} from '../../ui/h'
import {Button} from '../../ui/buttons'
import Icon from '../../ui/icons'
import router from 'next/router'

export default class OriginalTemplate extends Component {


  constructor(props){
    super(props)
    this.state = {
      selectedContent: props.story.contents[0]
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
      <Container>
        <PageButtonContainer>
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
        <BookContainer>
          <BookHeaderFooter>
            <H3>
              {story.title}
            </H3>
          </BookHeaderFooter>
          <PageContainer>
            <FeatureContainer>
              <ContentDisplaySwitcher
                content={selectedContent}
              />
            </FeatureContainer>
            <SideContainer>
              <HomeButton
                onClick={()=>router.back()}
              >
                <Icon
                  icon={"home"}
                  fill={"white"}
                />
              </HomeButton>
              <H3>
                {selectedContent.title}
              </H3>
              <ContentText
                dangerouslySetInnerHTML={{__html: selectedContent.description}}
              />
            </SideContainer>
          </PageContainer>

          <BookHeaderFooter>
            <H3>
              Page {selectedContent.index + 1} of {story.contents.length}
            </H3>
          </BookHeaderFooter>
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
        story
      }
    } = this

    this.setState({selectedContent: story.contents.find(content => content.index === selectedContent.index + direction)})
  }



}

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  display: flex;
  width: 100vw;
  box-sizing: border-box;
  height: 100vh;
`

const SideContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
`

const FeatureContainer = styled.div`
  width: 70%;
  display: flex;
  background-color: lightgrey;
  height: 100%;
`

const ContentText = styled.div`
  margin: 15px;
`

const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const BookHeaderFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: ${({theme}) => theme.colors.black};
  color: ${({theme}) => theme.colors.white};
`


const PageButtonContainer = styled.div`
  display: flex;
  position: fixed;
  top: 50%;
  transform: translateY(%50);
  width: 100%;
  justify-content: space-between;
  z-index: 1001;
`

const HomeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 40px;
  background-color: black;
  cursor: pointer;
`
