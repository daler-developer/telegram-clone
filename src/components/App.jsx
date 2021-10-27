import 'scss/index.scss'
import { onAuthStateChanged } from '@firebase/auth'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, useHistory } from 'react-router'
import CreateChatWindow from './CreateChatWindow'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import { auth, db } from 'firebase'
import { authActions, selectUser } from 'redux/reducers/authReducer'
import { selectSelectedChatId } from 'redux/reducers/chatsReducer'
import { arrayRemove, doc, updateDoc } from '@firebase/firestore'


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

  useEffect(() => {
    window.addEventListener('beforeunload', async (e) => {
      await updateDoc(doc(db, `/chats/${props.selectedChatId}`), {
        onlineList: arrayRemove(props.user.displayName)
      })
    })
  }, [])

  useEffect(() => {
    window.addEventListener('error', (e) => {
      alert('Error')
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
  selectedChatId: selectSelectedChatId(state),
  user: selectUser(state)
})

const mapDispatchToProps = {
  login: authActions.login,
  logout: authActions.logout
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

