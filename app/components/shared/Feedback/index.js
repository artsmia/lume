import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Modal } from '../../mia-ui/modals'
import { Button } from '../../mia-ui/buttons'
import { Icon } from '../../mia-ui/icons'
import fetch from 'isomorphic-unfetch'
import { Flex, Box } from 'grid-styled'
import { Input, Textarea, Label, Select, Option } from '../../mia-ui/forms'
import { H2 } from '../../mia-ui/text'

import { withRouter } from 'next/router'

const BugText = styled(Textarea)`
  width: 100%;
  height: 400px;
`

const BugInput = styled(Input)`
  width: 100%;
`

class Feedback extends Component {
  state = {
    modal: false,
    location: '',
    title: '',
    description: '',
    expectedOutcome: '',
    browser: ''
  }

  render() {
    const {
      state: { title, bugDescription, location, browser, sent },
      handleChange,
      submitBug
    } = this

    return (
      <Container>
        <Button
          round
          color={'blue'}
          title={'Report a Bug'}
          onClick={() => this.setState({ modal: true })}
        >
          <Icon icon={'bug_report'} color={'white'} />
        </Button>
        <Modal
          open={this.state.modal}
          onClose={() => this.setState({ modal: false })}
        >
          {sent ? (
            <Flex flexWrap={'wrap'}>
              <H2>Thanks for your feedback!</H2>
            </Flex>
          ) : (
            <Flex flexWrap={'wrap'}>
              <Box w={1} my={2}>
                <H2>Report A Bug</H2>
              </Box>
              <Box w={1}>
                <Label>Title</Label>
              </Box>
              <Box w={1}>
                <BugInput
                  name={'title'}
                  value={title}
                  onChange={handleChange}
                  hint={'Give a very brief title for the bug.'}
                />
              </Box>
              <Box w={1}>
                <Label>Browser</Label>
              </Box>
              <Box w={1}>
                <Select name={'browser'} onChange={handleChange}>
                  <Option value={'Chrome'}>Chrome</Option>
                  <Option value={'Safari'}>Safari</Option>
                  <Option value={'Firefox'}>Firefox</Option>
                  <Option value={'Edge'}>Edge</Option>
                  <Option value={'Internet Explorer'}>Internet Explorer</Option>
                  <Option value={'Other'}>Other</Option>
                </Select>
              </Box>
              <Box w={1}>
                <Label>Url Where Error Occurred</Label>
              </Box>
              <Box w={1}>
                <BugInput
                  name={'location'}
                  value={location}
                  onChange={handleChange}
                />
              </Box>
              <Box w={1}>
                <Label>Bug Description</Label>
              </Box>
              <Box w={1}>
                <BugText
                  name={'bugDescription'}
                  value={bugDescription}
                  onChange={handleChange}
                  hint={
                    'What were you doing before the bug occurred? Did something go wrong? Or is a feature just a bit confusing? What were you hoping would happen? Other comments?'
                  }
                />
              </Box>
              <Box>
                <Button onClick={submitBug}>Submit</Button>
              </Box>
            </Flex>
          )}
        </Modal>
      </Container>
    )
  }

  submitBug = async () => {
    try {
      const {
        state: { title, location, bugDescription, browser },
        props: {
          user,
          router: { asPath }
        }
      } = this

      this.setState({
        sent: true
      })

      let response = await fetch(`${process.env.API_URL}/bug`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: `BR: ${title}`,
          body: `
            Location of Error: ${location}

            Browser: ${browser}

            Submitted from: ${window.location}

            User: ${user ? user.email : ''}

            Description: ${bugDescription}
          `
        })
      })

      let json = await response.json()

      this.setState({
        modal: false,
        sent: false,
        location: '',
        title: '',
        description: '',
        expectedOutcome: '',
        browser: ''
      })

      console.log(json)
    } catch (ex) {
      console.error(ex)
    }
  }

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value })
}

const Container = styled(Flex)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  z-index: 5000;
  @media only screen and (max-width: 1025px) {
    display: none;
  }
  @media print {
    display: none;
  }
`

export default withRouter(Feedback)
