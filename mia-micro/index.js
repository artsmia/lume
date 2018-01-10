const fetch = require('isomorphic-unfetch')

exports.handler = (event, context, callback) => {

  let body = JSON.parse(event.body)

  let url = 'http://search.artsmia.org/id/' + body.id

  const options = {
    method: "GET",
  }

  fetch(url,options).then( resp => resp.json()).then(json => {

    let data = {
      obj: {
        accessionNumber: json["accession_number"],
        medium: json.medium,
        title: json.title,
        date: json.dated,
        dimensions: json.dimensions,
        attribution: json.artist,
        culture: json.culture || json.country,
        creditLine: json.creditline,
        currentLocation: json.room,
        dimensions: json.dimensions
      }
    }


    let result = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }


    callback(null, result)

  })
}
