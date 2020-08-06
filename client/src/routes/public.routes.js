import React from 'react'
import { Switch } from 'react-router-dom'
import { PublicRoute } from './helperRoutes'
import HomeView from '../views/HomeView'
import Login from '../views/Login/'
import Signup from '../views/Signup/'

const PublicRoutes = () => {
  return (
    <Switch>
      <PublicRoute exact path="/" component={HomeView} />
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/signup" component={Signup} />
    </Switch>
  )
}

export default PublicRoutes
