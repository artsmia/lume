

const Image = {
  async organization(src){
    try {
      return await src.getOrganization()
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Image
