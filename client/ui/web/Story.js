import React, {Component} from 'react'
import {Container, ImgContainer, Column} from './styled'

export default class Story extends Component {
  render() {
    const {
      story,
    } = this.props
    return (
      <Container>
        <ImgContainer>
          <h1>{story.title}</h1>
        </ImgContainer>
        <Column>
          {story.pages.map((page, index) => {
            return (
              <div>
                <h4>{index}: </h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: page.text
                  }}
                />
              </div>
            )
          })}
        </Column>
      </Container>
    )
  }
}
