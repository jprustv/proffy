import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Landing from './pages/Landing'
import TeacherList from './pages/TeacherList'
import TeacherForm from './pages/TeacherForm'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import UnauthenticatedRoute from './components/UnauthenticatedRoute'
import SignIn from './pages/SignIn'

function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <AuthenticatedRoute exact path="/">
          <Route path="/" exact component={Landing} />
          <Route path="/study" component={TeacherList} />
          <Route path="/give-classes" component={TeacherForm} />
        </AuthenticatedRoute>
        <UnauthenticatedRoute exact path="/signin">
          <Route path="/signin" exact component={SignIn} />
        </UnauthenticatedRoute>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
