import {ManagementClient} from 'auth0'

const auth0 = (process.env.AUTH_STRATEGY !== 'local') ? new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_MGMT_ID,
  clientSecret: process.env.AUTH0_MGMT_SECRET
}) : {
  getUser(){
    console.log("local mode")
  }
}

export default auth0
