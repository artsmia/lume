
let apiUrl
let auth0ID
let auth0Domain
let url
let s3Url
let googleApiKey
let googleClientId
let gdriveSearchUrl
let domain
let prefix = "https://"

switch (process.env.API_CONFIG) {
  case "dev": {
    apiUrl = "https://api.knight.u100.io"

    break
  }
  case "beta": {
    apiUrl = "https://api.beta.u100.io"

    break
  }
  default:
  case "local": {
    apiUrl= "http://localhost:5000"
    break
  }
}

switch (process.env.NODE_ENV) {
  case "dev": {
    auth0ID = "j8pjiCmNfc74AYnuP8MR0PZAbk68syv6"
    auth0Domain = "artsmia.auth0.com"
    url = "https://knight.u100.io"
    domain = "knight.u100.io"
    s3Url = "https://s3.amazonaws.com"
    googleApiKey = "AIzaSyB74ffA_5MUNzEcNFDZs0SNOhoSGzlbD6M"
    googleClientId = "386077841817-kpp5vbepavknjo55s7nvh8bp2uv7lp80.apps.googleusercontent.com	"
    gdriveSearchUrl = `https://www.googleapis.com/drive/v3/files/?key=${googleApiKey}`
    break
  }
  case "production": {
    auth0ID = "j8pjiCmNfc74AYnuP8MR0PZAbk68syv6"
    auth0Domain = "artsmia.auth0.com"
    url = "https://beta.u100.io"
    s3Url = "https://s3.amazonaws.com"
    googleApiKey = "AIzaSyB74ffA_5MUNzEcNFDZs0SNOhoSGzlbD6M"
    googleClientId = "386077841817-kpp5vbepavknjo55s7nvh8bp2uv7lp80.apps.googleusercontent.com	"
    gdriveSearchUrl = `https://www.googleapis.com/drive/v3/files/?key=${googleApiKey}`
    break
  }
  default: {
    prefix = "http://"
    auth0ID = "j8pjiCmNfc74AYnuP8MR0PZAbk68syv6"
    auth0Domain = "artsmia.auth0.com"
    domain = "localhost:5000"
    url = "http://localhost:3000"
    s3Url = "https://s3.amazonaws.com"
    googleApiKey = "AIzaSyB74ffA_5MUNzEcNFDZs0SNOhoSGzlbD6M"
    googleClientId = "386077841817-kpp5vbepavknjo55s7nvh8bp2uv7lp80.apps.googleusercontent.com	"
    gdriveSearchUrl = `https://www.googleapis.com/drive/v3/files/?key=${googleApiKey}`
  }
}


console.log(apiUrl)


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
