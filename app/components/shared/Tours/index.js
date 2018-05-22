import { Button } from '../../mia-ui/buttons'
import fetch from 'isomorphic-unfetch'
import { ImagesQuery } from '../../../apollo/queries/images'
import { CreateContent } from '../../../apollo/mutations/createContent'

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

  nextStep = () => {
    this.stepIndex = this.stepIndex + 1
    this.parentCtx.setState({ tour: this })
  }

  stepIndex = 0

  callback = ctx => {
    return async e => {
      try {
        const { action, index, lifecycle, step } = e

        if (
          action === 'update' &&
          lifecycle === 'tooltip' &&
          step.beforeTooltip
        ) {
          await step.beforeTooltip()
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
        beforeTooltip: async () => {
          try {
            await this.write(
              ctx,
              "Curator's office is one of my *favorite* works at the Minneapolis Institute of Art.",
              'description'
            )
            ctx.setState({ descriptionDone: true })
          } catch (ex) {
            console.error(ex)
          }
        },
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
        target: '#change-image',
        content: (
          <div>
            <p>
              It's also important to give your story an image. Whenever a part
              of your story allows you to include an image, Lume will provide
              you with a tool that looks like this.
            </p>
          </div>
        ),
        spotlightClicks: true,
        disableBeacon: true,
        component: 'ChangeImage'
      },
      {
        target: '#tab-header',
        content: (
          <div>
            <p>
              The image manager allows you to select from your existing images
              or to upload new images.
            </p>
            <Button
              onClick={() => {
                ctx.setState({ selectedTab: 'upload' })
                this.stepIndex = this.stepIndex + 1
                this.parentCtx.setState({ tour: this })
              }}
            >
              Next
            </Button>
          </div>
        ),
        beforeTooltip: async () => {
          try {
            console.log('before image-manager')
          } catch (ex) {
            console.error(ex)
          }
        },
        spotlightClicks: true,
        disableBeacon: true,
        component: 'ImageManager'
      },
      {
        target: '#upload-images-container',
        content: (
          <div>
            <p>We will start by uploading a new image.</p>
            <p>
              Because Lume is a free to use and open source program, we ask that
              all of our users ensure that they have the right to share any
              images they use on Lume.
            </p>
            <p>
              You should also make sure to include a title and description of
              your image when you upload it. This will make it easier to search
              for later and will allow users with screen readers to better
              understand your story.
            </p>
            <Button
              onClick={async () => {
                try {
                  let {
                    data: { images }
                  } = await ctx.props.client.query({
                    query: ImagesQuery,
                    variables: {
                      filter: {
                        organization: {
                          subdomain: ctx.props.router.query.subdomain
                        },
                        search: "Curator's Office"
                      }
                    }
                  })

                  if (images.length < 1) {
                    await ctx.handleUpload()
                  }

                  ctx.props.returnToSelect()

                  this.stepIndex = this.stepIndex + 1
                  this.parentCtx.setState({ tour: this })
                } catch (ex) {
                  console.error(ex)
                }
              }}
            >
              Next
            </Button>
          </div>
        ),
        beforeTooltip: async () => {
          try {
            console.log('before upload')
            let response = await fetch(`/static/curatorsoffice.jpg`)

            let arrayBuffer = await response.arrayBuffer()

            let files = [
              new File([arrayBuffer], 'curatorsoffice.jpg', {
                type: 'image/jpeg'
              })
            ]

            ctx.handleFile({ target: { name: 'files', files } })
            await this.write(ctx, "Curator's Office", 'title')
            await this.write(ctx, "A 1950's curator office.", 'description')
            ctx.setState({ hasRights: true })
          } catch (ex) {
            console.error(ex)
          }
        },
        disableBeacon: true,
        component: 'ImageUploader'
      },
      {
        target: '#select-images-container',
        content: (
          <div>
            <p>
              When your images are done uploading to Lume, they will appear here
              amongst your other images.
            </p>
            <p>
              Don't worry if your image doesn't appear immediately, it can take
              several minutes for images to appear depending on your internet
              speed. Lume allows for large images and it sometimes take a few
              moments for our servers to break those images up into tiles.
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
        // beforeTooltip: async()=>{
        //   try {
        //     console.log(ctx)
        //     ctx.setState({selectedTab: 'select'})
        //   } catch (ex) {
        //     console.error(ex)
        //   }
        // },
        placement: 'right',
        disableBeacon: true,
        component: 'ImageManager'
      },
      {
        target: '#image-search',
        content: (
          <div>
            <p>
              When your images are done uploading to Lume, they will appear here
              amongst your other images.
            </p>
            <p>
              Don't worry if your image doesn't appear immediately, it can take
              several minutes for images to appear depending on your internet
              speed. Lume allows for large images and it sometimes take a few
              moments for our servers to break those images up into tiles.
            </p>
            <Button
              onClick={() => {
                let image = ctx.props.images.find(
                  image => image.title === "Curator's Office"
                )
                ctx.handleImageSelect(image)
                this.stepIndex = this.stepIndex + 1
                this.parentCtx.setState({ tour: this })
              }}
            >
              Next
            </Button>
          </div>
        ),
        beforeTooltip: async () => {
          try {
            await this.write(ctx, "Curator's Office", 'search')
            await ctx.handleSearch()
          } catch (ex) {
            console.error(ex)
          }
        },
        placement: 'right',
        disableBeacon: true,
        component: 'ImageManager'
      },
      {
        target: '#image-manager-zoomer',
        content: (
          <div>
            Once your image has finished uploading and you've selected it, you
            can see it in all its high resolution glory using Lume's special
            tiled image viewer.
            <Button
              onClick={() => {
                ctx.handleImageSave()
                this.stepIndex = this.stepIndex + 1
                this.parentCtx.setState({ tour: this })
              }}
            >
              Use Image for Story
            </Button>
          </div>
        ),
        placement: 'right',
        disableBeacon: true,
        component: 'ImageManager'
      },
      {
        content: (
          <div>
            <p>
              We've edited some elements of our story but the real opportunity
              for storytelling comes from a story's content blocks.
            </p>
            <p>
              The bar on the side of our editor allows us to edit a specific
              content block or our story itself. The sidebar is also where we
              find the button that allows us to create new content blocks.
            </p>
            <Button
              onClick={() => {
                this.stepIndex = this.stepIndex + 1
                this.parentCtx.setState({ tour: this })
              }}
            >
              Create a content block
            </Button>
          </div>
        ),
        target: '#sidebar',
        disableBeacon: true,
        placement: 'right',
        component: 'editor'
      },
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

                  this.stepIndex = this.stepIndex + 1
                  this.parentCtx.setState({ tour: this })
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
        disableBeacon: true,
        component: 'editor'
      },
      {
        target: '#select-object',
        content: (
          <div>
            <p>
              This tool allows us to search our organization's objects to create
              new objects. At Mia, the object's in our system typically refer to
              a specic item in our collection.
            </p>
            <p>Many of our stories are centered around such objects.</p>

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
        component: 'ObjSelector'
      },
      {
        target: '#create-object',
        content: (
          <div>
            <p>
              Let's go ahead and create a new Object that corresponds to
              Curator's Office.
            </p>
          </div>
        ),
        disableBeacon: true,
        spotlightClicks: true,
        component: 'ObjSelector'
      },
      {
        target: '#obj-editor',
        content: (
          <div>
            <p>
              Now that we've created an object, we can edit it and associate it
              with an image.
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
        beforeTooltip: async () => {
          try {
            await this.write(ctx, "Curator's Office", 'title')

            await this.write(ctx, 'Mark Dion', 'attribution')

            await this.write(
              ctx,
              'G378, Minneapolis Institute of Art',
              'currentLocation'
            )

            await this.write(ctx, '2012-2013', 'date')

            let {
              data: { images }
            } = await ctx.props.client.query({
              query: ImagesQuery,
              variables: {
                filter: {
                  organization: {
                    subdomain: ctx.props.router.query.subdomain
                  },
                  search: "Curator's Office"
                }
              }
            })

            await ctx.handleImageChange({
              target: { name: 'primaryImadeId', value: images[0].id }
            })
          } catch (ex) {
            console.error(ex)
          }
        },
        disableBeacon: true,
        component: 'ObjEditor'
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
        spotlightClicks: true,
        component: 'editor'
      },
      {
        content: (
          <div>
            <p>Just click again to return to the editor.</p>
          </div>
        ),
        target: '#preview-button',
        disableBeacon: true,
        spotlightClicks: true,
        component: 'editor'
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
                  this.stepIndex = this.stepIndex + 1
                  this.parentCtx.setState({ tour: this })
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
        disableBeacon: true,
        component: 'editor'
      },
      {
        target: '#edit-details',
        content: (
          <div>
            <p>
              A detail content allows for a title, description, and image like
              many of the other contents.{' '}
            </p>
            <Button
              onClick={() => {
                ctx.props.editContent({
                  id: ctx.props.content.id,
                  geoJSON: {
                    type: 'FeatureCollection',
                    features: [
                      {
                        type: 'Feature',
                        geometry: {
                          type: 'Polygon',
                          coordinates: [
                            [
                              [198.397487, -85.674805],
                              [198.397487, -44.378906],
                              [251.282861, -44.378906],
                              [251.282861, -85.674805],
                              [198.397487, -85.674805]
                            ]
                          ]
                        }
                      }
                    ]
                  }
                })
                this.stepIndex = this.stepIndex + 1
                this.parentCtx.setState({ tour: this })
              }}
            >
              Next
            </Button>
          </div>
        ),
        beforeTooltip: async () => {
          try {
            await this.write(ctx, 'Subtext', 'title')
            //await this.write(ctx,"The bookshelf in particular offers a special glimpse into Kestle’s personal and professional interests, among them Basic Russian and Das Kapital.  Whether readings for pleasure or politics is uncertain, but perhaps the answer can be read in his eventual disappearance.", "description")

            let {
              data: { images }
            } = await ctx.props.client.query({
              query: ImagesQuery,
              variables: {
                filter: {
                  organization: {
                    subdomain: ctx.props.router.query.subdomain
                  },
                  search: "Curator's Office"
                }
              }
            })

            await ctx.handleChange({
              target: { name: 'image0Id', value: images[0].id }
            })
          } catch (ex) {
            console.error(ex)
          }
        },
        disableBeacon: true,
        placement: 'right',
        component: 'DetailEditor'
      },
      {
        target: '#zoomer-box',
        content: (
          <div>
            <p>
              Notice how a detail contents allow you to highlight a selection
              from the image.{' '}
            </p>
            <p>
              You can use detail content's to draw attention to interesting
              elements in your object's image.
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
        placement: 'left',
        component: 'DetailEditor'
      },
      {
        target: '#additional-images',
        content: (
          <div>
            <p>You can also add more images.</p>
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
        placement: 'left',
        component: 'DetailEditor'
      },
      {
        target: '#additional-media',
        content: (
          <div>
            <p>You can also add more media.</p>
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
        placement: 'left',
        component: 'DetailEditor'
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
                ctx.handleStorySelection()
                this.stepIndex = this.stepIndex + 1
                this.parentCtx.setState({ tour: this })
              }}
            >
              Next
            </Button>
          </div>
        ),
        disableBeacon: true,
        target: '#story-thumb',
        component: 'editor'
      },
      {
        target: '#story-slug',
        content: (
          <div>
            <p>
              One of the neat things about Lume is that every story has its own
              unique url (which you'll be able to visit once you set your
              story's visibility to published).
            </p>
            <p>
              You have the ability to change the text that will appear in your
              stories url by editing the Pretty Url field. Be careful though!
              Editing this field could break old links for users if you've
              already shared your story.
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
      }
    ]
  }
}
