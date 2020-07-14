const fs = require('fs')
const { spawn } = require('child_process')

const baseDir = './api/store/'

function searchData(params, data) {

  const output = []
  const keys = Object.keys(params)

  for (const key of keys) {


    let string = ''
    const term = params[key]
    const rgx = new RegExp(term, 'gi')

    if(data[key]) string = data[key]

    if(rgx.test(string)) {
      output.push(data)
      return output
    }
  
  }

  return output
}

function readFiles(files, complete) {
  
  // The map finishes in a funny order because of async 
  // so we can't rely on the index...
  let counter = 0
  let length = 0
  let dataSet = []

  const id = setTimeout(() => {

    counter = length
    return complete(null, dataSet, true)

  }, 100000)

  files.forEach((file, i) => {


    if(file === '') return counter++

    const dir = baseDir + file

    fs.readFile(dir, 'utf8', (err, utf8Data) => {

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
        if(counter === files.length) {
          clearTimeout(id)
          complete(null, dataSet)
        }
        return
      }


      dataSet = [
        ...dataSet,
        data
      ]

      counter++
      if(counter === files.length) {
        clearTimeout(id)
        return complete(null, dataSet)
      }
    })

  })

}

module.exports = function grep(term, complete) {

  let output = ''

  const grep = spawn('grep', ['-rwli', `"${term}"`], { cwd: baseDir })

  grep.stdout.on('data', data => {
    output += data
  })

  grep.stdout.on('close', code => {

    grep.kill()

    if(output.length === 0) {
      console.log('No documents containing ', term)
      return complete(null, [])
    }

    const files = output.split(/\n/g)

    console.log('files: ', files)

    readFiles(files, complete)
  })

}

