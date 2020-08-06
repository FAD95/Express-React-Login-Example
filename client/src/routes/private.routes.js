import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import { PrivateRoute } from './helperRoutes'
import Profile from '../views/Profile/'

/**
 * Return private routes
 * [These routes needs to have a valid token]
 * @param {any} props
 */

const PrivateRoutes = (props) => {
  return (
    <Switch>
      <PrivateRoute exact path="/profile" component={Profile} />
      <Redirect path="/**" to="/" />
    </Switch>
  )
}

export default PrivateRoutes
