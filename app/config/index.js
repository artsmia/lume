const {
  NODE_ENV: environment
} = process.env

let apiUrl
let auth0ID
let auth0Domain
let url
let s3Url
let googleApiKey
let googleClientId
let gdriveSearchUrl

switch (environment) {
  case "production": {
    apiUrl = "https://api.knight.u100.io"
    auth0ID = "j8pjiCmNfc74AYnuP8MR0PZAbk68syv6"
    auth0Domain = "artsmia.auth0.com"
    url = "https://knight.u100.io"
    s3Url = "https://s3.amazonaws.com"
    googleApiKey = "AIzaSyB74ffA_5MUNzEcNFDZs0SNOhoSGzlbD6M"
    googleClientId = "386077841817-kpp5vbepavknjo55s7nvh8bp2uv7lp80.apps.googleusercontent.com	"
    gdriveSearchUrl = `https://www.googleapis.com/drive/v3/files/?key=${googleApiKey}`
    break
  }
  default: {
    apiUrl = "http://localhost:5000"
    auth0ID = "j8pjiCmNfc74AYnuP8MR0PZAbk68syv6"
    auth0Domain = "artsmia.auth0.com"
    url = "http://localhost:3000"
    s3Url = "https://s3.amazonaws.com"
    googleApiKey = "AIzaSyB74ffA_5MUNzEcNFDZs0SNOhoSGzlbD6M"
    googleClientId = "386077841817-kpp5vbepavknjo55s7nvh8bp2uv7lp80.apps.googleusercontent.com	"
    gdriveSearchUrl = `https://www.googleapis.com/drive/v3/files/?key=${googleApiKey}`
  }
}


export {
  apiUrl,
  auth0ID,
  auth0Domain,
  url,
  s3Url,
  googleApiKey,
  googleClientId,
  gdriveSearchUrl
}
