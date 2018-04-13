module.exports = async(req, res, next) => {
  try {

    let allowed = ['admin', 'editor', 'contributor']

    const {
      params,
      session: {
        passport: {
          user: {
            idToken,
            id
          }
        }
      }
    } = req

    let response = await fetch(process.env.API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'content-type': 'application/json',
        'userid': id
      },
      body: JSON.stringify({
        query: `{
          authenticate {
            timestamp
            user {
              id
            }
            permissions {
              organization {
                id
                subdomain
              }
              role
            }
          }
        }`
      })
    })

    let {
      data: {
        authenticate: {
          permissions
        }
      }
    } = await response.json()

    let permission = permissions.find(
      ({organization}) => organization.subdomain === params.subdomain
    )

    switch (true) {
      case (!permission): {

        return res.redirect('/error')
      }
      case (permission.role === 'pending'): {

        return res.redirect(`/${req.params.subdomain}/cms/pending`)
      }
      case (allowed.includes(permission.role)): {

        return next()
      }
      default: {

        return res.redirect('/error')
      }
    }



  } catch (ex) {
    console.error(ex)
  }
}
