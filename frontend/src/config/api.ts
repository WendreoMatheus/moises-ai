import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NODE_ENV === 'test' ? '/api' : 'https://api.github.com',
  headers: {
    'Content-Type': 'application/json',
  },
})
