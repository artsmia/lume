const {
  NODE_ENV: environment
} = process.env

let apiUrl
let auth0ID
let auth0Domain
let url

switch (environment) {
  case "production": {
    apiUrl = "https://api.knight.u100.io"
    auth0ID = "j8pjiCmNfc74AYnuP8MR0PZAbk68syv6"
    auth0Domain = "artsmia.auth0.com"
    url = "https://knight.u100.io"
    break
  }
  default: {
    apiUrl = "http://localhost:5000"
    auth0ID = "j8pjiCmNfc74AYnuP8MR0PZAbk68syv6"
    auth0Domain = "artsmia.auth0.com"
    url = "https://localhost:3000"
  }
}


export {
  apiUrl,
  auth0ID,
  auth0Domain
}
