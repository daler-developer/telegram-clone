import { connect } from 'react-redux'
import { selectIsAuthenticated } from 'redux/reducers/authReducer'
import { selectSelectedChatId } from 'redux/reducers/chatsReducer'
import Chat from './Chat'
import Intro from './Intro'
import Sidebar from './Sidebar'


const HomePage = (props) => {
  return (
    <div className={'home-page'}>
      <div className={'home-page__body'}>
        <Sidebar />
        {props.selectedChatId ? <Chat /> : <Intro />}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state),
  selectedChatId: selectSelectedChatId(state),
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
