import axios from 'axios'

let baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000'
baseURL += '/api'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export {
  api,
  baseURL
}
