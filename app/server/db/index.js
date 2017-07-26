const db = require('./connect')
const models = require('./models')

db.sync().then((success) =>{
  console.log("db syn success?")
}).catch((ex) => {
  console.error("db sync error", ex)
})


module.exports = db
