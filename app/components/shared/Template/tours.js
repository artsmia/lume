async function wait(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, duration)
  })
}

async function write(text, el) {
  try {
    for (let i = 0; i <= text.length; i++) {
      await wait(50)
      el.value = text.slice(0, i)
    }
  } catch (ex) {
    console.error(ex)
  }
}

export default {
  organizations: [
    {
      content: (
        <div>
          <h2>Welcome to Lume!</h2>
          <p>First thing: Let's get you set up with an organization!</p>
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
    },
    {
      content: (
        <div>
          <p>
            All users on Lume are organized into organizations. An organization
            might be a museum, a class project, or just a group of story tellers
            who want to collaborate.
          </p>
          <p>
            Organization members can share images and edit each others' stories.
            All of the stories that they've published will appear together on
            their organization's public page.
          </p>
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
    },
    {
      target: "#join-org",
      content: (
        <div>
          <p>
            You can join an organization by searching for the organization by
            name and then selecting it from the dropdown menu.{" "}
          </p>
          <p>
            Note: some organizations require approval for new users or only
            allow users with organization specific email addresses. If you join
            such an organization, the admins will be notified of your join
            request and you will have to wait for their approval.
          </p>
        </div>
      )
    },
    {
      target: "#create-org",
      content: (
        <div>
          <p>
            You can also create your own organization by entering a name and
            subdomain here.
          </p>
        </div>
      )
    },
    {
      target: "#subdomain",
      content: (
        <div>
          <p>
            Each organization is given its own unique url at
            https://lume.space/~subdomain~
          </p>
          <p>
            Choose your subdomain wisely as this value can't currently be
            changed!
          </p>
        </div>
      )
    }
  ],
  cmsHome: {
    basic: [
      {
        content: (
          <div>
            <h2>Welcome!</h2>
            <p>This is your organization's main content management page.</p>
          </div>
        ),
        placement: "center",
        disableBeacon: true,
        target: "body"
      },
      {
        target: "#create-story-button",
        content: (
          <div>
            <p>
              You can create a new story by clickin the green button and
              entering the name of your new story.
            </p>
          </div>
        )
      }
    ],
    adminOnly: [
      {
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
      }
    ]
  },
  editor: {
    frankenstein: [
      {
        content: (
          <div>
            <p>
              Let's dive right in and we learn what everything is on the way.
            </p>
          </div>
        ),
        placement: "center",
        disableBeacon: true,
        target: "body"
      },
      {
        content: (
          <div>
            <p>
              Every story should have a description. We reccomend keeping any
              blocks of text short and easy to read. You can add markdown
              styling to your text, as well!
            </p>
          </div>
        ),
        target: "#story-description",
        async code() {
          try {
            let el = document.getElementById("story-description")
            await write(
              "Some stuff here about Frankenstein and then about how you can do *this with the asterisks*.",
              el
            )
          } catch (ex) {
            console.error(ex)
          }
        }
      }
    ]
  }
}
