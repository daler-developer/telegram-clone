import { connect } from 'react-redux'
import logo from 'assets/logo.svg'
import { selectIsAuthenticated } from 'redux/reducers/authReducer'
import { signInWithPopup } from '@firebase/auth'
import { auth, googleProvider } from 'firebase'


const LoginPage = (props) => {
  if (props.isAuthenticated) {
    return <h1>Error</h1>
  }

  const handleLogin = () => {
    signInWithPopup(auth, googleProvider)
  }

  return (
    <div className={'login-page'}>
      <div className={'login-page__body'}>
        <img className={'login-page__logo'} src={logo} />
        <h1 className={'login-page__title h4'}>
          Sign in to WhatsApp
        </h1>
        <button className={'login-page__sign-in-btn'} onClick={handleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
