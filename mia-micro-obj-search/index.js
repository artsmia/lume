const fetch = require('isomorphic-unfetch')

exports.handler = (event, context, callback) => {
  let search = event.pathParameters.search

  let url = 'http://search.artsmia.org/' + search

  const options = {
    method: 'GET'
  }

  fetch(url, options)
    .then(resp => resp.json())
    .then(json => {
      let data = json.hits.hits.map(({ _source }) => ({
        medium: _source.medium,
        title: _source.title,
        date: _source.dated,
        dimensions: _source.dimensions,
        accessionNumber: _source.accession_number,
        attribution: _source.artist,
        culture: _source.culture || _source.country,
        creditLine: _source.creditline,
        currentLocation: _source.room,
        description: _source.description || _source.text
      }))

      let result = {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      }

      callback(null, result)
    })
}
