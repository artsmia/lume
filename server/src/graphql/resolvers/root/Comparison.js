import Story_Comparison from '../../../db/models/Story_Comparison'

const Comparison = {
  async comparisonImage0(src, args){
    try {

      return await src.getComparisonImage0()
    } catch (ex) {
      console.error(ex)
    }
  },
  async comparisonImage1(src, args){
    try {
      return await src.getComparisonImage1()
    } catch (ex) {
      console.error(ex)
    }
  },
  async index(src, args, context, info){

    if (src.index) return src.index

    if (src.story_comparison) return src.story_comparison.index

  },
}

export default Comparison
