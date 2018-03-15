export default ({
  image,
  organization,
  quality
}) => {

  let src = ''

  if (!image){
    return src
  }

  if (
    organization.customImageApiEnabled
  ) {
    src = `https://cdn.dx.artsmia.org/thumbs/tn_${image.localId}.jpg`
  } else {
    src = `${process.env.S3_URL}/mia-lume/${organization.id}/${image.id}/${quality}`
  }

  if (process.env.FILE_STORAGE === "local") {
    src = `${process.env.API_URL}/static/${image.id}/${imgQuality}.jpeg`
  }

  return src

}
