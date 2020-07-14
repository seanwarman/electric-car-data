import axios from 'axios'

const config = {
  baseURL: 'http://ec2-34-242-206-210.eu-west-1.compute.amazonaws.com'
}

export default (() => {
  return {
    get: uri => axios.get(uri, config),
    put: (uri, data) => axios.put(uri, data, config)
  }
})()
