import { Button } from '../../mia-ui/buttons'

export default class Tour {
  wait = duration => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, duration)
    })
  }

  write = async (ctx, text, name) => {
    try {
      for (let i = 0; i <= text.length; i++) {
        await this.wait(15)
        ctx.handleChange({
          target: {
            name,
            value: text.slice(0, i)
          }
        })
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  constructor(parentCtx) {
    this.parentCtx = parentCtx
  }

  stepIndex = 0

  callback = ctx => {
    return async ({ action, index, lifecycle }) => {
      try {
        if (action === 'update' && index === 2 && lifecycle === 'tooltip') {
          await this.write(
            ctx,
            "Curator's office is one of my *favorite* works at the Minneapolis Institute of Art.",
            'description'
          )
          ctx.setState({ descriptionDone: true })
        }
      } catch (ex) {
        console.error(ex)
      }
    }
  }

  run = ctx => {
    let steps = this.steps(ctx)

    let step = steps[this.stepIndex]

    if (step.component === ctx.tourId) {
      return true
    } else {
      return false
    }
  }

  steps = ctx => {
    return [
      {
        content: (
          <div>
            <p>
              Welcome to Lume's primary story editing screen. Let's get started
              right away and we'll point out Lume's many features as we go
              along!
            </p>
            <Button
              onClick={() => {
                this.stepIndex = this.stepIndex + 1
                this.parentCtx.setState({ tour: this })
              }}
            >
              Next
            </Button>
          </div>
        ),
        placement: 'center',
        disableBeacon: true,
        target: 'body',
        component: 'editor'
      },
      {
        content: (
          <div>
            <p>
              Whenever you first navigate to the Story Editor page, you will be
              presented with the opportunity to edit the properties of your
              story itself –– like its title, description, template, visibility,
              and more. (as opposed to any contents you might add to it.)
            </p>
            <Button
              onClick={() => {
                this.stepIndex = this.stepIndex + 1
                this.parentCtx.setState({ tour: this })
              }}
            >
              Next
            </Button>
          </div>
        ),
        disableBeacon: true,
        target: '#editing-pane',
        component: 'editor'
      },
      {
        target: '#story-description',
        content: (
          <div>
            <p>
              Your story should definitely include a description. Try and keep
              it short!
            </p>

            <p>
              Bonus tip: all of the description fields in Lume allow you to use
              markdown styling to emphasis your writing!
            </p>

            {ctx.state.descriptionDone ? (
              <Button
                onClick={() => {
                  this.stepIndex = this.stepIndex + 1
                  this.parentCtx.setState({ tour: this })
                }}
              >
                Next
              </Button>
            ) : null}
          </div>
        ),
        disableBeacon: true,
        spotlightClicks: true,
        component: 'StoryEditor'
      },
      {
        target: '#save-status',
        content: (
          <div>
            <p>
              While you're editing, take not of the save status at the top of
              the page. Lume will automatically save any edits you make so you
              don't need to worry about losing your work.
            </p>

            <Button
              onClick={() => {
                this.stepIndex = this.stepIndex + 1
                this.parentCtx.setState({ tour: this })
              }}
            >
              Next
            </Button>
          </div>
        ),
        disableBeacon: true,
        component: 'StoryEditor'
      },
      {
        target: '#change-story-image',
        content: (
          <div>
            <p>
              It's also important to give your story an image. Whenever a part
              of your story allows you to include an image, Lume will provide
              you with a tool that looks like this.
            </p>

            <Button
              onClick={() => {
                this.stepIndex = this.stepIndex + 1
                this.parentCtx.setState({ tour: this })
              }}
            >
              Next
            </Button>
          </div>
        ),
        disableBeacon: true,
        component: 'StoryEditor'
      },
      {
        target: '#upload-images-container',
        content: (
          <div>
            <p>
              The image manager allows you to select from your existing images
              or to upload new images.
            </p>
            <Button
              onClick={() => {
                ctx.setState(({ demoIndex }) => ({ demoIndex: demoIndex + 1 }))
                this.stepIndex = this.stepIndex + 1
                this.parentCtx.setState({ tour: this })
              }}
            >
              Next
            </Button>
          </div>
        ),
        disableBeacon: true,
        component: 'ImageUploader'
      },
      // {
      //   target: '#upload-images-container',
      //   content: (
      //     <div>
      //       <p>
      //         Because Lume is a free to use and open source program, we ask that
      //         all of our users ensure that they have the right to share any images
      //         they use on Lume.
      //       </p>
      //       <p>
      //         You should also make sure to include a title and description of your
      //         image when you upload it. This will make it easier to search for
      //         later and will allow users with screen readers to better understand
      //         your story.
      //       </p>
      //
      //       {this.props.showDemo && this.state.hasRights ? (
      //         <Button
      //           onClick={async () => {
      //
      //             let {
      //               data: { images }
      //             } = await this.props.client.query({
      //               query: ImagesQuery,
      //               variables: {
      //                 filter: {
      //                   organization: {
      //                     subdomain: this.props.router.query.subdomain
      //                   },
      //                   search: "Curator's Office"
      //                 }
      //               }
      //             })
      //
      //             if (images.length < 1) {
      //               await this.handleUpload()
      //             }
      //
      //             this.props.onDemoFinish()
      //           }}
      //         >
      //           Next
      //         </Button>
      //       ) : null}
      //     </div>
      //   ),
      //   disableBeacon: true
      // },
      // {
      //   content: (
      //     <div>
      //       <p>
      //         We've edited some elements of our story but the real opportunity for
      //         storytelling comes from a story's content blocks.
      //       </p>
      //       <p>
      //         The bar on the side of our editor allows us to edit a specific
      //         content block or our story itself. The sidebar is also where we find
      //         the button that allows us to create new content blocks.
      //       </p>
      //       <Button
      //         onClick={() => {
      //           ctx.setState(({ demoIndex }) => ({
      //             demoIndex: demoIndex + 1
      //           }))
      //         }}
      //       >
      //         Create a content block
      //       </Button>
      //     </div>
      //   ),
      //   target: '#sidebar',
      //   disableBeacon: true,
      //   placement: 'right',
      //   component: "editor"
      // },
      {
        content: (
          <div>
            <p>
              There are currently five different types of content: picture,
              move, object, comparison, and detail.
            </p>

            <p>
              We're going to look at Object, Comparison, and Detail in this
              walkthrough.
            </p>

            <p>First let's create an Object content.</p>
            <Button
              onClick={async () => {
                try {
                  const {
                    data: { createContent: content }
                  } = await ctx.props.client.mutate({
                    mutation: CreateContent,
                    variables: {
                      storyId: ctx.props.story.id,
                      type: 'obj'
                    }
                  })
                  await ctx.props.refetch()
                  ctx.handleContentSelection(content.id)

                  ctx.setState(({ demoIndex }) => ({
                    demoIndex: demoIndex + 1,
                    showObjContentDemo: true,
                    showDemo: false
                  }))
                } catch (ex) {
                  console.error(ex)
                }
              }}
            >
              Create a content block
            </Button>
          </div>
        ),
        target: '#create-content',
        disableBeacon: true
      },
      {
        content: (
          <div>
            <p>
              At any time we can preview our story. This is what your story will
              look like to your users.
            </p>
          </div>
        ),
        target: '#preview-button',
        disableBeacon: true,
        spotlightClicks: true
      },
      {
        content: (
          <div>
            <p>Just click again to return to the editor.</p>
          </div>
        ),
        target: '#preview-button',
        disableBeacon: true,
        spotlightClicks: true
      },
      {
        content: (
          <div>
            <p>Let's create another content. This time a detail content.</p>

            <Button
              onClick={async () => {
                try {
                  const {
                    data: { createContent: content }
                  } = await ctx.props.client.mutate({
                    mutation: CreateContent,
                    variables: {
                      storyId: ctx.props.story.id,
                      type: 'detail'
                    }
                  })
                  await ctx.props.refetch()
                  ctx.handleContentSelection(content.id)

                  ctx.setState(({ demoIndex }) => ({
                    demoIndex: demoIndex + 1,
                    showDetailDemo: true,
                    showDemo: false
                  }))
                } catch (ex) {
                  console.error(ex)
                }
              }}
            >
              Create a content block
            </Button>
          </div>
        ),
        target: '#create-content',
        disableBeacon: true
      },
      {
        content: (
          <div>
            <p>
              Later, if you're editing one of your story's contents, you can
              return to editing the story itself by click on this button at the
              top of your sidebar.
            </p>
            <Button
              onClick={() => {
                ctx.setState(({ demoIndex }) => ({
                  showDetailDemo: false,
                  editing: 'story',
                  showStoryEditorDemo: true,
                  storyDemoIndex: 3,
                  showDemo: false
                }))
              }}
            >
              Next
            </Button>
          </div>
        ),
        disableBeacon: true,
        target: '#story-thumb'
      }
    ]
  }
}
