const {
  NODE_ENV: environment
} = process.env

let apiUrl
let auth0ID
let auth0Domain
let url
let s3Url

switch (environment) {
  case "production": {
    apiUrl = "https://api.knight.u100.io"
    auth0ID = "j8pjiCmNfc74AYnuP8MR0PZAbk68syv6"
    auth0Domain = "artsmia.auth0.com"
    url = "https://knight.u100.io"
    s3Url = "https://s3.amazonaws.com"
    break
  }
  default: {
    apiUrl = "http://localhost:5000"
    auth0ID = "j8pjiCmNfc74AYnuP8MR0PZAbk68syv6"
    auth0Domain = "artsmia.auth0.com"
    url = "http://localhost:3000"
    s3Url = "https://s3.amazonaws.com"
  }
}


export {
  apiUrl,
  auth0ID,
  auth0Domain,
  url,
  s3Url
}
