import mailgun from 'mailgun-js'

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
})

export default async({subject, to, html}) => {
  try {
    return new Promise( (resolve, reject) =>  {
      mg.messages().send(
        {
          subject,
          to,
          html,
          from: "Lume <notifications@mail.lume.space>"
        },
        (error, body) => {
          if (error) reject(error)
          resolve(body)
        }
      )
    })
  } catch (ex) {
    console.error(ex)
  }
}
