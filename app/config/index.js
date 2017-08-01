const {
  NODE_ENV: environment
} = process.env

let apiUrl


switch (environment) {
  case "production": {
    apiUrl = "https://api.knight.u100.io"
    break
  }
  default: {
    apiUrl = "http://localhost:5000"
  }
}


export {
  apiUrl
}
