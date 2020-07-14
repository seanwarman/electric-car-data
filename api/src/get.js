const grep = require('./libs/grep')

module.exports = (req, res) => {

  const term = req.params.term

  if(!term) res.status(400).send()

  console.log('term: ', term)

  grep(term, (err, docs, timout) => {
    if(err) {
      console.log('error: ', err)
      return res.status(500).send(err)
    }

    if(timout) {
      console.log('timeout')
      return res.send(docs)
    }

    return res.send(docs.map(item => {

      // Remove the two biggest fields for speed...
      const {
        m_szDocBody,
        m_szDocSumamry,
        m_Topics,
        m_SocialTags,
        m_Industry,
        m_Technology,
        ...doc
      } = item

      return doc
    }))

  })


}
