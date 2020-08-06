import React from 'react'
import Header from './Header/'

export default ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container d-flex justify-content-center">{children}</div>
    </div>
  )
}
