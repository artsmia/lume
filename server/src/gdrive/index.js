import google from 'googleapis'
import fetch from 'node-fetch'
import {getUser} from '../auth/management'

const {
  gdriveClientID,
  gdriveClientSecret,
  gdriveApiKey
} = process.env

const OAuth2 = google.auth.OAuth2

const gDirectory = 'application/vnd.google-apps.folder'

const auth = new OAuth2(
  gdriveClientID,
  gdriveClientSecret,
  "http://localhost:5000/gdrive"
)

const drive = google.drive({
  version: 'v3',
})

//
//
// class G {
//
//   constructor({
//     userId
//   }) {
//     this.userId = userId
//
//     this.google = google
//
//     this.gDirectory = 'application/vnd.google-apps.folder'
//
//     this.auth = new this.google.auth.OAuth2(
//       gdriveClientID,
//       gdriveClientSecret,
//       "http://localhost:5000/gdrive"
//     )
//
//     this.drive = this.google.drive({
//       version: 'v3'
//     })
//
//   }
//
//   async getCredentials(){
//     try {
//       const {identities} = await getUser(this.userId)
//
//       const {access_token} = identities.find(
//         identity => identity.provider === 'google-oauth2'
//       )
//
//       this.auth.setCredentials({
//         access_token,
//       })
//
//       this.google.options({auth})
//
//     } catch (ex) {
//       console.error(ex)
//     }
//   }
//
//
//   async list(options) {
//     return new Promise( (resolve, reject) => {
//       this.drive.files.list(options, (err, response) => {
//         if (err) reject(err)
//         resolve(response)
//       })
//     })
//   }
//
// }

export default async function(req, res, next){
  try {

    const {
      body: {
        userId
      },
      file
    } = req

    // const drive = new G({
    //   userId
    // })
    //
    // await drive.getCredentials()
    //
    // const results = await drive.list({
    //   q: `mimeType='${drive.gDirectory}' and name='Knight Images' and appProperties has {key='knight' and value='true'}`,
    //   fields: 'files(id, name, appProperties, permissions)'
    // })
    //
    // console.log(results)

    const {identities} = await getUser(userId)

    const {access_token} = identities.find(
      identity => identity.provider === 'google-oauth2'
    )

    auth.setCredentials({
      access_token,
    })

    google.options({auth})




    let {files} = await driveSearch({
      q: `mimeType='${gDirectory}' and name='Knight Images' and appProperties has {key='knight' and value='true'}`,
      fields: 'files(id, name, appProperties, permissions)'
    })

    let knightDirectoryId


    if (files.length < 1) {
       let {id} = await driveCreate({
        resource: {
          name: 'Knight Images',
          mimeType: gDirectory,
          appProperties: {
            knight: true
          },
        },
      })

      await drivePermissions({
        resource: {
          type: 'anyone',
          role: 'reader'
        },
        fileId: id
      })

      knightDirectoryId = id

    } else {
      knightDirectoryId = files[0].id
    }

    console.log(knightDirectoryId)






    res.send({cool: "done"})

  } catch (ex) {
    console.error(ex)
  }

}


async function driveSearch(options){
  return new Promise( (resolve, reject) => {
    drive.files.list(options, (err, response) => {
      if (err) reject(err)
      resolve(response)
    })
  })
}


async function driveCreate(options){
  return new Promise( (resolve, reject) => {
    drive.files.create(options, (err, response) => {
      if (err) reject(err)
      resolve(response)
    })
  })
}

async function drivePermissions(options){
  return new Promise( (resolve, reject) => {
    drive.permissions.create(options, (err, response) => {
      if (err) reject(err)
      resolve(response)
    })
  })
}
