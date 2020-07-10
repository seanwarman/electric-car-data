const fs = require('fs')

module.exports = function find(params, complete) {

  // The map finishes in a funny order because of async 
  // so we can't rely on the index...
  let counter = 0
  let length = 0
  let results = []

  const id = setTimeout(() => {

    counter = length
    complete(null, results, true)

  }, 4000)

  const [ key ] = Object.keys(params)
  const term = params[key]

  const rgx = new RegExp(term, 'gi')

  fs.readdir('./api/store', 'utf8', (err, dir) => {
    if(err) return complete(err)

    length = dir.length

    dir.forEach((file, i) => {
      fs.readFile('./api/store/' + file, 'utf8', (err, data) => {

        if(err) {
          clearTimeout(id)
          return complete(err)
        }

        let string = ''
        let result

        try {
          result = JSON.parse(data)
        } catch (err) {
          console.log(err)
          counter++
          if(counter === dir.length) {
            clearTimeout(id)
            complete(null, results)
          }
          return
        }

        if(result[key]) string = result[key]

        if(rgx.test(string)) results.push(result)

        counter++
        if(counter === dir.length) {
          clearTimeout(id)
          complete(null, results)
        }
      })

    })
  })

}

