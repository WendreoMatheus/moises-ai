import axios from 'axios'

let baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
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
