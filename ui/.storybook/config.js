import { configure } from '@storybook/react'
import { setDefaults } from '@storybook/addon-info'
import { withKnobs} from '@storybook/addon-knobs/react'
import { addDecorator } from '@storybook/react'
import ThemeProvider from '../theme'
import Global from '../theme/global'
import React from 'react'

addDecorator(withKnobs)

addDecorator( story => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
))



setDefaults({
  inline: true,
  header: false
})

function loadStories() {
  require('../stories/text.js')
  require('../stories/layout.js')
  require('../stories/form.js')
  require('../stories/buttons.js')
  require('../stories/icon.js')

  // You can require as many stories as you need.
}

configure(loadStories, module)
