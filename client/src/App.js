import React from 'react'
import { Router } from 'react-router-dom'

import history from './history'

import Layout from './components/Layout/'
import PublicRoutes from './routes/public.routes'
import PrivateRoutes from './routes/private.routes'

export default function App(props) {
  return (
    <Router history={history}>
      <Layout>
        <PublicRoutes />
        <PrivateRoutes />
      </Layout>
    </Router>
  )
}
