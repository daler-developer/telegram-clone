import 'scss/index.scss'
import { onAuthStateChanged } from '@firebase/auth'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, useHistory } from 'react-router'
import CreateChatWindow from './CreateChatWindow'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import { auth } from 'firebase'
import { authActions } from 'redux/reducers/authReducer'


const App = (props) => {
  const history = useHistory()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, photoURL, displayName } = user
        props.login({ uid, photoURL, displayName })
        history.push('/home')
      } else {
        props.logout()
        history.push('/login')
      }
    })
  }, [])

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

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  login: authActions.login,
  logout: authActions.logout
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

