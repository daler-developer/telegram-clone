import { connect } from 'react-redux'
import logo from 'assets/logo.svg'


const LoginPage = (props) => {
  return (
    <div className={'login-page'}>
      <div className={'login-page__body'}>
        <img className={'login-page__logo'} src={logo} />
        <h1 className={'login-page__title h4'}>
          Sign in to WhatsApp
        </h1>
        <button className={'login-page__sign-in-btn'}>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
