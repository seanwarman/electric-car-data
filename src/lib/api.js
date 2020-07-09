import axios from 'axios'

const config = {
  baseURL: 'http://localhost:3333'
}

export default (() => {
  return {
    get: uri => axios.get(uri, config)
  }
})()
