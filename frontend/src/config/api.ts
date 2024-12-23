import axios from 'axios'

export const baseURL = 'http://localhost:8000/api'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})
