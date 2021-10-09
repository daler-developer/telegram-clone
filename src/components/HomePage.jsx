import { connect } from 'react-redux'
import { selectIsAuthenticated } from 'redux/reducers/authReducer'
import Chat from './Chat'
import SideBar from './SideBar'


const HomePage = (props) => {
  if (!props.isAuthenticated) {
    return <h1>Error</h1>
  }

  return (
    <div className={'home-page'}>
      <div className={'home-page__body'}>
        <SideBar />
        <Chat />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
