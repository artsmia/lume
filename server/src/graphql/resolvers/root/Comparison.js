

const Comparison = {
  async comparisonImage0(src){
    try {
      return await src.getComparisonImage0()
    } catch (ex) {
      console.error(ex)
    }
  },
  async comparisonImage1(src){
    try {
      return await src.getComparisonImage1()
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Comparison
