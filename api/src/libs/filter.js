const fs = require('fs')

function searchData(params, data) {

  const keys = Object.keys(params)

  for (const key of keys) {


    let string = ''
    const term = params[key]
    const rgx = new RegExp(term, 'gi')

    if(data[key]) string = data[key]

    if(!rgx.test(string)) {
      return []
    }
  
  }

  return [ data ]
}

module.exports = function find(params, complete) {

  // The map finishes in a funny order because of async 
  // so we can't rely on the index...
  let counter = 0
  let length = 0
  let dataSet = []

  const id = setTimeout(() => {

    counter = length
    complete(null, dataSet, true)

  }, 4000)

  fs.readdir('./api/store', 'utf8', (err, dir) => {
    if(err) return complete(err)

    length = dir.length

    dir.forEach((file, i) => {
      fs.readFile('./api/store/' + file, 'utf8', (err, utf8Data) => {

        if(err) {
          clearTimeout(id)
          return complete(err)
        }

        let data

        try {
          data = JSON.parse(utf8Data)
        } catch (err) {
          console.log(err)
          counter++
          if(counter === dir.length) {
            clearTimeout(id)
            complete(null, dataSet)
          }
          return
        }


        dataSet = [
          ...dataSet,
          ...searchData(params, data)
        ]

        counter++
        if(counter === dir.length) {
          clearTimeout(id)
          complete(null, dataSet)
        }
      })

    })
  })

}

