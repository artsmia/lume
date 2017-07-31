import React, {Component} from 'react'
import fetch from 'isomorphic-unfetch'
import Story from '../ui/Story'

export default class StoryPage extends Component {

  static getInitialProps = async (context) => {
    try {

      const {groupTitle, storyId} = context.query

      const response = await fetch('https://new.artsmia.org/crashpad/')

      const data = await response.json()

      const story = data.stories[storyId]


      return {
        story,
        groupTitle,
        data
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    const {
      story,
      groupTitle,
      data
    } = this.props
    return (
      <Story
        story={story}
        groupTitle={groupTitle}
        data={data}
      />
    )
  }
}
