import fetch from 'node-fetch'

export default async function(id){
  try {
    let url = `http://search.artsmia.org/id/${id}`

    const options = {
      method: "GET",
    }

    const response = await fetch(url,options)

    const json = await response.json()

    const data = {
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

    return data

  } catch (ex) {
    console.error(ex)
  }
}
