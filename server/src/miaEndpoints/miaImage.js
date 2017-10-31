import fetch from 'node-fetch'

export default async function(id){
  try {
    const thumb = `https://cdn.dx.artsmia.org/thumbs/${id}`

    const data = {
      thumb,

    }
    return data

  } catch (ex) {
    console.error(ex)
  }
}
