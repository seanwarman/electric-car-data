const grep = require('./grep')

const batteryTypes = [
  'Aluminium-air',
  'Improved lithium-ion',
  'Lithium-ion',
  'Madder',
  'Pupurin',
  'Graphene',
  'Brine',
  'Lead-acid',
  'Copper Nanowire cathode lithuim',
  'Nanoscopic copper',
  'Lithium silicone polymer',
  'Carbon nanotube electrode lithium',
  'Lithium air carbon',
  'Carbon foam',
  'Carbon foam capacitor hybrid',
  'Lithium Sulfur Carbon Nanofiber',
  'Lithium Manganese Composite',
  'Silicon Carbon Nanocomposite'
]

function parseParams(item) {

  // Drop off some data to lighten the load...
  const {
    m_szDocBody,
    m_szDocSumamry,
    m_Topics,
    m_SocialTags,
    m_Industry,
    m_Technology,
    m_szDocID,
    m_szGeol,
    m_szSourceType,
    m_Places,
    m_People,
    m_BiGrams,
    m_TriGrams,
    m_BiCnt,
    m_TriCnt,
    ...doc
  } = item

  // Create a new param that searches for matches
  // in the document body...
  const m_szBatteryTech = batteryTypes.filter(type => {

    const rgxType = RegExp(type, 'gi')
  
    return rgxType.test(m_szDocBody)

  })

  return {
    ...doc,
    m_szBatteryTech
  }

}

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

      return parseParams(item)

    }))

  })


}

