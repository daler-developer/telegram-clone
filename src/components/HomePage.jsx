import { connect } from 'react-redux'
import { selectIsAuthenticated } from 'redux/reducers/authReducer'
import { selectChatById, selectSelectedChatId } from 'redux/reducers/chatsReducer'
import Chat from './Chat'
import Intro from './Intro'
import Sidebar from './Sidebar'


const HomePage = (props) => {
  if (!props.isAuthenticated) return null

  return (
    <div className={'home-page'}>
      <div className={'home-page__body'}>
        <Sidebar />
        {props.selectedChat ? <Chat /> : <Intro />}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state),
  selectedChat: selectChatById(state, selectSelectedChatId(state))
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
