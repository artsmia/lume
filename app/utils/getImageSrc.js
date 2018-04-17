export default ({
  image,
  organization,
  quality
}) => {

  let src = ''

  if (!image || !organization){
    return src
  }


  if (
    organization.customImageApiEnabled
  ) {
    src = `https://cdn.dx.artsmia.org/thumbs/tn_${image.localId}.jpg`
  } else {
    src = `${process.env.S3_URL}/mia-lume/${organization.id}/${image.id}/${quality}.png`
  }

  if (organization.subdomain === "local") {
    src = `${process.env.LOCAL_TILE_URL}/static/${image.id}/${quality}.jpeg`
  }

  return src

}
