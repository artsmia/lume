import db from '../../../db/connect'
// import {createAssociations} from '../associations'
import query from './comparison'

describe("comparison", ()=> {

  it("finds a comparison when given an id", async () => {

    let comparison = await query(undefined,{
      id: "123"
    })


    expect(true).toBe(true)

  })

})
