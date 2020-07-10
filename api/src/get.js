const find = require('./find')

module.exports = (req, res) => {

  const term = req.params.term
  const key  = req.params.key

  find({ [key]: term }, (err, data, timout) => {
    if(err) return res.status(500).send(err)
    if(timout) return res.send(data)
    return res.send(data)
  })


}
