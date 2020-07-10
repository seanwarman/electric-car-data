const filter = require('./libs/filter')

module.exports = (req, res) => {
  console.log('calling filter endpoint')

  const filters = req.body

  if(!filters) res.status(400).send()
  if(Object.keys(filters).length === 0) res.status(400).send()
  
  filter(filters, (err, data, timeout) => {
    if(err) return res.status(500).send(err)
    if(timeout) return res.send(data)
    return res.send(data)
  })

}
