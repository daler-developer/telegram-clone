import { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import 'scss/index.scss'
import CreateChatWindow from './CreateChatWindow'
import HomePage from './HomePage'
import LoginPage from './LoginPage'

const App = () => {

  return (
    <div className={'app'}>
      <Switch>

        <Route path={'/'} exact>
          <Redirect to={'/home'} />
        </Route>

        <Route path={'/login'}>
          <LoginPage />
        </Route>

        <Route path={'/home'}>
          <HomePage />
        </Route>

      </Switch>

      <CreateChatWindow />
    </div>
  )
}

export default App

