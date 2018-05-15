import gql from "graphql-tag"
import { tipsQuery } from "./getToolTips"

export default {
  Mutation: {
    showSnack(obj, { message }, { cache }, info) {
      const data = {
        snack: {
          __typename: "Snack",
          message,
          snackId: Math.random()
        }
      }

      cache.writeData({ data })
      return data
    },
    setSaveStatus(obj, variables, { cache }, info) {
      const data = {
        saveStatus: {
          __typename: "SaveStatus",
          ...variables
        }
      }

      cache.writeData({ data })
      return data
    },
    showTips(obj, { show }, { cache }, info) {
      console.log("show tips")
      let data = {
        toolTips: {
          __typename: "ToolTips",
          show
        }
      }
      cache.writeData({ data })
      return data
    },
    addTips(obj, { tips }, { cache }, info) {
      let data = cache.readQuery({ query: tipsQuery })

      data.toolTips.tips = tips
        .map(tip => ({
          ...tip,
          __typename: "Tip"
        }))
        .concat(...data.toolTips.tips)

      cache.writeData({ data })
      return data
    },
    removeTips(obj, { tips }, { cache }, info) {
      let data = cache.readQuery({ query: tipsQuery })

      data.toolTips.tips = data.toolTips.tips.filter(
        currentTip => !tips.find(tip => currentTip.target === tip.target)
      )

      cache.writeData({ data })
      return data
    }
  }
}
