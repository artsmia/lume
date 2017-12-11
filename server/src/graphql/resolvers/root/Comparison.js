import Image from '../../../db/models/Image'


const Comparison = {
  async comparisonImage0(src, args){
    try {

      console.log(src.comparisonImage0Id)

      return await Image.findById(src.comparisonImage0Id)
    } catch (ex) {
      console.error(ex)
    }
  },
  async comparisonImage1(src, args){
    try {
      return await Image.findById(src.comparisonImage1Id)
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Comparison
