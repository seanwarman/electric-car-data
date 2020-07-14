import axios from 'axios'

const config = {
  baseURL: 'http://192.168.1.4:3333'
}

export default (() => {
  return {
    get: uri => axios.get(uri, config),
    put: (uri, data) => axios.put(uri, data, config)
  }
})()
