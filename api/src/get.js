const find = require('./libs/find')

module.exports = (req, res) => {

  const term = req.params.term
  const key  = req.params.key

  if(!key || !term) res.status(400).send()

  find({ [key]: term }, (err, data, timout) => {
    if(err) return res.status(500).send(err)
    if(timout) return res.send(data)
    return res.send(data)
  })


}
