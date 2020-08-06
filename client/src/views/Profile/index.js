import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_API_URL } from '../../config.json'

export default function Profile(token) {
  const Axios = axios.create({
    baseURL: `${BASE_API_URL}`,
    headers: { Authorization: 'Bearer ' + token },
  })

  useEffect(() => {
    Axios.get('/profile').then((res) => console.log(res))
  }, [])

  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}
