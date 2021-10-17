import { connect } from 'react-redux'
import { selectChatById, selectSelectedChatId } from 'redux/reducers/chatsReducer'


const ChatHeader = (props) => {

  const isLastOnlineItem = (index) => {
    return props.selectedChat.onlineList.length === index + 1
  }

  return (
    <div className="chat-header">
      {/* Left */}
      <div className="chat-header__left">
        <img src={props.selectedChat.photoURL} className="chat-header__photo" />
        <span className="chat-header__chat-name">
          {props.selectedChat.name}
        </span>
        <div className="chat-header__online-panel">
          <span>Online:</span>
          <ul className="chat-header__online-list">
            {
              props.selectedChat.onlineList.map((online, i) => (
                <li className="chat-header__online-item">
                  {online}{!isLastOnlineItem(i) ? ',' : null}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      {/* Right */}
      <div className="chat-header__right">
        <button className="chat-header__btn" type="button">
          <span className="chat-header__search-icon chat-header__icon material-icons-outlined">
            search
          </span>
        </button>
        <button className="chat-header__btn" type="button">
          <span className="chat-header__more-vert-icon chat-header__icon material-icons-outlined">
          more_vert
          </span>
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  selectedChat: selectChatById(state, selectSelectedChatId(state))
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader)
