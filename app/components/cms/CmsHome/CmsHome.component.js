import React, { Component } from "react"
import styled from "styled-components"
import { H2 } from "../../mia-ui/text"
import { Loading } from "../../mia-ui/loading"
import StoryList from "../StoryList"
import CreateStoryButton from "../CreateStoryButton"
import PropTypes from "prop-types"
import { NextA } from "../../mia-ui/links"
import { Icon } from "../../mia-ui/icons"
import { Flex, Box } from "grid-styled"
import { Page, Card } from "../../mia-ui/layout"
import Head from "../../shared/head"
import Joyride from "react-joyride"
import Link from "next/link"
import { Button } from "../../mia-ui/buttons"

export default class CmsHome extends Component {
  // static propTypes = {
  //   organization: PropTypes.shape({
  //     name: PropTypes.string.isRequired
  //   }).isRequired,
  //   user: PropTypes.shape({
  //     id: PropTypes.string.isRequired
  //   }).isRequired,
  //   router: PropTypes.shape({
  //     query: PropTypes.shape({
  //       subdomain: PropTypes.string.isRequired
  //     }).isRequired
  //   }).isRequired
  // }

  generateTutorial = () => {
    let tutorial = []

    if (this.props.organization) {
      tutorial.push({
        content: (
          <div>
            <h2>Welcome to {this.props.organization.name}!</h2>
            <p>This is your organization's main content management page.</p>
          </div>
        ),
        placement: "center",
        disableBeacon: true,
        styles: {
          options: {
            zIndex: 10000
          }
        },
        target: "body"
      })
    }

    let { role } = this.props.user.organizations.find(
      org => org.id === this.props.organization.id
    )

    if (role === "admin") {
      tutorial.push({
        target: "#org-settings",
        content: (
          <div>
            <p>
              Because you are an administrator for your organization, you can
              edit its settings by click on the gear icon.(Non-administrators
              can't edit organization settings.)
            </p>
            <p>
              Your organization settings page is where you go to do things like:
              change the name of your organization, add new members and change
              member permissions, adjust who can join your organization, create
              special groups for your stories, and configure some of Lume's more
              advanced organization settings.
            </p>
          </div>
        )
      })
    }

    tutorial = tutorial.concat([
      {
        target: "#story-list",
        content:
          "This is where your organization's stories are listed. You search through them using the search input and sort the results using the arrows at the top of the table."
      },
      {
        target: "body",
        placement: "center",
        disableBeacon: true,
        content: (
          <div>
            <p>
              If you'd like help creating your first story, you can click the
              button below to start the ride along!
            </p>
            <Button
              onClick={() => {
                this.setState(({ tourIndex }) => ({
                  tourIndex: tourIndex + 1
                }))
              }}
            >
              Start Ride Along
            </Button>
          </div>
        )
      },
      {
        target: "#create-story-button",
        content: (
          <div>
            <p>
              We're going to create our first story together about one of the
              greatest books of all time: Frankenstein by Mary Shelley.
            </p>
            <Button
              onClick={() => {
                this.setState(({ tourIndex }) => ({
                  tourIndex: tourIndex + 1,
                  rideAlong: true
                }))
              }}
            >
              Next
            </Button>
          </div>
        )
      }
    ])

    this.setState({
      tutorial,
      showTutorial: true
    })
  }

  state = {
    showTutorial: false,
    tutorial: [],
    tourIndex: 3,
    rideAlong: false
  }

  tips = [
    {
      target: "#story-list",
      content: "These are all your organization's stories",
      placement: "top-start"
    },
    {
      target: "#create-story-button",
      content: "Click here to create your first story!",
      placement: "top-start"
    }
  ]

  componentDidMount() {
    // this.props.addTips({
    //   tips: this.tips
    // })

    if (this.props.user && this.props.organization) {
      this.generateTutorial()
    }
  }

  tutorialCallback = event => {
    console.log(event)

    const { action, index, lifecycle } = event
    if (action === "close" && lifecycle === "complete") {
      this.setState(({ tourIndex }) => ({ tourIndex: tourIndex + 1 }))
    }
  }

  // componentDidUpdate() {
  //   if (this.props.user && this.props.organization) {
  //     this.generateTutorial()
  //   }
  // }

  // componentWillUnmount() {
  //   this.props.removeTips({
  //     tips: this.tips
  //   })
  // }

  render() {
    // if (!this.props.organization) return <Loading/>
    const {
      props: {
        user,
        user: { id: userId },
        organization,
        router: {
          query: { subdomain }
        }
      }
    } = this

    let showSettings = user.organizations.find(
      org => org.role === "admin" && org.subdomain === subdomain
    )

    return (
      <Page>
        <Head
          title={organization ? organization.name : "Organization Stories"}
        />

        <Flex w={1} pb={2}>
          <Box width={9 / 10}>
            <H2>{organization ? organization.name : ""}</H2>
          </Box>
          <Flex width={1 / 10} justifyContent={"flex-end"} id={"org-settings"}>
            {showSettings ? (
              <NextA
                href={{
                  pathname: "/cms/orgSettings",
                  query: {
                    subdomain
                  }
                }}
                as={`/cms/${subdomain}/settings`}
              >
                <Icon
                  icon={"settings"}
                  color={"black"}
                  title={"Settings"}
                  size={"30px"}
                />
              </NextA>
            ) : null}
          </Flex>
        </Flex>
        <Card p={3}>
          <StoryFlex flexWrap={"wrap"}>
            <CreateFlex w={1} justifyContent={"flex-end"}>
              <CreateStoryButton
                userId={userId}
                id={"create-story"}
                tutorial={this.state.showTutorial && this.state.tourIndex === 4}
                rideAlong={this.state.rideAlong}
              />
            </CreateFlex>
            <Box width={1}>
              <StoryList />
            </Box>
          </StoryFlex>
        </Card>

        <Joyride
          steps={this.state.tutorial}
          run={this.state.showTutorial}
          callback={this.tutorialCallback}
          stepIndex={this.state.tourIndex}
          styles={{
            options: {
              zIndex: 10000
            },
            buttonNext: {
              display: "none"
            },
            buttonBack: {
              display: "none"
            }
          }}
        />
      </Page>
    )
  }
}

const StoryFlex = styled(Flex)`
  position: relative;
`

const CreateFlex = styled(Flex)`
  position: absolute;
`
