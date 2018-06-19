import React, {Component} from 'react'
import styled from 'styled-components'
import {Flex, Box} from 'grid-styled'
import Zoomer, {ContentZoomer, StoryZoomer} from '../../shared/Zoomer'
import ContentDisplaySwitcher from '../../contents/DisplaySwitcher'
import Markdown from 'react-markdown'
import {H1,H2} from '../../mia-ui/text'
import ImgSrcProvider from '../../shared/ImgSrcProvider'

export default class PrintTemplate extends Component {


  render(){
    const {
      story
    } = this.props

    let objContent = story.contents.find(content => content.type === 'obj')

      return (
        <Container
          w={'8.5in'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'flex-start'}
        >
          {story.template === 'slider' ? (
            <SliderStoryFlex
              w={1}
              pt={3}
            >
              <LeftFlex
                w={2/5}
              >
                <H1>{story.title}</H1>


              </LeftFlex>
              <RightFlex
                w={3/5}
                pl={2}
              >
                  <Zoomer
                    imageId={story.previewImage.id}
                  />


              </RightFlex>
            </SliderStoryFlex>
          ) : null}
          {story.template === 'original' ? (
            <OriginalStoryFlex
              w={1}
              pt={3}
              flexDirection={'column'}
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
            >
              <Flex
                w={1}
              >
                <PreviewImgWithSrc
                  image={story.previewImage}
                />
                <Flex
                  w={1}
                  flexDirection={'column'}
                >
                  <H1>{story.title}</H1>
                  {objContent ? (
                    <ObjInfo
                      {...objContent.obj}
                    />
                  ):null}
                </Flex>


              </Flex>
              <StoryZoomerFlex
                w={1}
                py={3}
              >
                <StoryZoomer
                  storyId={this.props.story.id}
                  mode={'content'}
                  selectedContentId={''}
                  onContentSelection={()=>{console.log('hello')}}
                />
              </StoryZoomerFlex>

            </OriginalStoryFlex>
          ) : null}
          {story.contents.map(content => (
            <ContentFlex
              key={content.id}
              pt={3}
            >
              <LeftFlex
                w={2/5}
                flexDirection={'column'}
                alignItems={'flex-start'}
              >

                {content.obj ? (
                  <ObjInfo
                    {...content.obj}
                  />
                ):<h2>{content.title}</h2>}
                <Markdown
                  source={content.description}
                />


              </LeftFlex>
              <RightFlex
                w={3/5}
                pl={2}
              >
                  <ContentDisplaySwitcher
                    content={content}
                  />


              </RightFlex>
            </ContentFlex>
          ))}
        </Container>
      )

  }
}

const Container = styled(Flex)`
  margin: auto;
  margin-top: 20px;
  @media print {
    @page {
      margin: .2in;
    }
  }
`

const OriginalStoryFlex = styled(Flex)`
  width: 100%;
  height: 11.2in;
  @media print {
    page-break-inside: avoid;

  }
`

const SliderStoryFlex = styled(Flex)`
  width: 100%;
  height: 5.4in;
  @media print {
    page-break-inside: avoid;

  }
`

const ContentFlex = styled(Flex)`
  width: 100%;
  height: 5.4in;
  overflow: hidden;
  @media print {
    page-break-inside: avoid;
  }
`

const LeftFlex = styled(Flex)`

`

const RightFlex = styled(Flex)`

`

const PreviewImg = styled.img`
  height: 2in;
  width: 2in;
  object-fit: contain;
`

const PreviewImgWithSrc = ImgSrcProvider(PreviewImg)


const ObjInfo = ({title, attribution, culture, date, currentLocation, medium, dimensions, creditLine, accessionNumber}) => (
  <Box
    my={2}
  >
    {title ? <Title>{title}</Title> : null}

    {attribution ? <Attribution>{attribution}</Attribution> : null}

    {culture && date ? (
      <CultureDate>{`(${culture}, ${date})`}</CultureDate>
    ) : null}

    {currentLocation ? (
      <CurrentLocation>{currentLocation}</CurrentLocation>
    ) : null}

    {medium ? <MoreText>{medium}</MoreText> : null}

    {dimensions ? <MoreText>{dimensions}</MoreText> : null}

    {creditLine ? <MoreText>{creditLine}</MoreText> : null}

    {accessionNumber ? <MoreText>{accessionNumber}</MoreText> : null}
  </Box>
)

const Title = styled.h1`
  font-family: ${({ theme }) => theme.font.regular};
  font-size: 1.2rem;
  margin: 0;
`

const Attribution = styled.h2`
  font-family: ${({ theme }) => theme.font.light};
  font-size: 1rem;
  margin: 0;
`

const CultureDate = styled.h3`
  font-family: ${({ theme }) => theme.font.light};
  font-size: 1rem;
  margin: 0;
`

const CurrentLocation = styled.h3`
  font-family: ${({ theme }) => theme.font.light};
  font-size: 1rem;
  margin: 0;
`

const ShowMore = styled.button`
  font-family: ${({ theme }) => theme.font.light};
  font-size: 0.8rem;
  width: 100%;
  border: 0;
  background-color: white;
  justify-content: center;
`
const More = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const MoreText = styled.h5`
  font-family: ${({ theme }) => theme.font.light};
  font-size: 0.9rem;
  margin: 0;
`

const StoryZoomerFlex = styled(Flex)`
  height: 100%;
  position: relative;
`
