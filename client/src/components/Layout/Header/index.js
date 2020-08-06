import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../config.json'

export default () => {
  const [actualHref, setActualHref] = useState('')

  function handleClick(e) {
    setActualHref(e.target.href)
  }

  useEffect(() => {
    setActualHref(window.location.href)
  }, [])

  return (
    <header>
      <ul className="nav justify-content-center">
        {actualHref !== `${BASE_URL}/` ? (
          <li className="nav-item">
            <Link className="nav-link" onClick={handleClick} to="/">
              Home
            </Link>
          </li>
        ) : null}
        {actualHref !== `${BASE_URL}/login` ? (
          <li className="nav-item">
            <Link className="nav-link" onClick={handleClick} to="/login">
              Login
            </Link>
          </li>
        ) : null}
        {actualHref !== `${BASE_URL}/signup` ? (
          <li className="nav-item">
            <Link className="nav-link" onClick={handleClick} to="/signup">
              Register
            </Link>
          </li>
        ) : null}
      </ul>
    </header>
  )
}
