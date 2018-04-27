import fetch from 'isomorphic-unfetch'
import jwt from 'jsonwebtoken'
import fs from 'fs'

export default async (req, res, next) => {
  try {

    let cert = fs.readFileSync('github.pem')


    let jwtToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 300,
        iss: process.env.GITHUB_ISS
      },
      cert,
      { algorithm: "RS256"}
    )

    let response = await fetch(`https://api.github.com/app/installations`, {
      method: 'GET',
      headers: {
        "Accept": 'application/vnd.github.machine-man-preview+json',
        Authorization: `Bearer ${jwtToken}`
      },
    })

    let json = await response.json()

    response = await fetch(`https://api.github.com/installations/143304/access_tokens`, {
      method: 'POST',
      headers: {
        "Accept": 'application/vnd.github.machine-man-preview+json',
        Authorization: `Bearer ${jwtToken}`
      },
    })

    json = await response.json()

    let accessToken = json.token

    response = await fetch(`https://api.github.com/repos/artsmia/lume/issues`, {
      method: 'POST',
      headers: {
        "Accept": 'application/vnd.github.machine-man-preview+json',
        Authorization: `token ${accessToken}`
      },
      body: JSON.stringify(req.body)
    })

    json = await response.json()

    res.json({success: true})

  } catch (ex) {
    console.error(ex)
  }
}
