import auth0 from './auth0'

if (process.env.NODE_ENV === 'production'){
  auth0.getClient({
    client_id: process.env.AUTH0_CLIENT_ID
  }, (err, client) => {
    if (err) console.log(err)
    let {callbacks} = client

    callbacks.push(`${process.env.CMS_URL}/callback`,`${process.env.LUME_URL}/callback` )

    auth0.updateClient({
      client_id: process.env.AUTH0_CLIENT_ID,
    }, {
      callbacks
    }, (err, client) => {
      if (err) console.log(err)
    })

  })
}
