import { deleteDoc, doc } from '@firebase/firestore'
import { db } from 'firebase'
import { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { selectChatById, selectSelectedChatId } from 'redux/reducers/chatsReducer'
import { commonActions, selectSearchMessageInputValue } from 'redux/reducers/commonReducer'
import { selectSearchMessagePanelVisibility, uiActions } from 'redux/reducers/uiReducer'


const ChatHeader = (props) => {
  const searchMessageInputRef = useRef(null)

  useEffect(() => {
    if (props.searchMessagePanelVisibility) {
      searchMessageInputRef.current?.focus()
    }
  }, [props.searchMessagePanelVisibility])


  const isLastOnlineItem = (index) => {
    return props.selectedChat.onlineList.length === index + 1
  }

  const deleteCurrentChat = async () => {
    await deleteDoc(doc(db, '/chats' , props.selectedChat.id))
  }

  const handleSearchBtnClick = () => {
    props.setSearchMessagePanelVisibility({ to: !props.searchMessagePanelVisibility })
  }

  const handleDeleteChatBtnClick = () => {
    deleteCurrentChat()
  }

  const handleBugerMenuBtnClick = () => {
    props.setSidebarVisibility({ to: true })
  }

  return (
    <div className="chat-header">
      {/* Search Panel */}
      <div className={`chat-header__search-panel ${!props.searchMessagePanelVisibility && 'chat-header__search-panel--hidden'}`}>
        <input
          placeholder="Search message"
          className="chat-header__search-input"
          value={props.searchMessageInputValue}
          onChange={(e) => props.setSearchMessageInputValue({ to: e.target.value })}
          ref={searchMessageInputRef}
        />
      </div>


      {/* Left */}
      <div className="chat-header__left">
        <button className="chat-header__btn chat-header__burger-menu-btn" onClick={handleBugerMenuBtnClick}>
          <span className="chat-header__icon chat-header__burger-icon material-icons">
            menu
          </span>
        </button>
        <img src={props.selectedChat.photoURL} className="chat-header__photo" />
        <span className="chat-header__chat-name">
          {props.selectedChat.name}
        </span>
        <div className="chat-header__online-panel">
          <span className="chat-header__online-label">Online:</span>
          <ul className="chat-header__online-list">
            {
              props.selectedChat.onlineList.map((online, i) => (
                <li className="chat-header__online-item" key={i}>
                  {online}{!isLastOnlineItem(i) ? ',' : null}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      {/* Right */}
      <div className="chat-header__right">
        <button className="chat-header__btn chat-header__search-btn" type="button" onClick={handleSearchBtnClick}>
          <span className="chat-header__search-icon chat-header__icon material-icons-outlined">
            search
          </span>
        </button>
        <button className="chat-header__btn chat-header__delete-btn" type="button" title="Detete chat" onClick={handleDeleteChatBtnClick}>
          <span className="chat-header__delete-icon chat-header__icon material-icons-outlined">
            delete
          </span>
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  selectedChat: selectChatById(state, selectSelectedChatId(state)),
  searchMessageInputValue: selectSearchMessageInputValue(state),
  searchMessagePanelVisibility: selectSearchMessagePanelVisibility(state)
})

const mapDispatchToProps = {
  setSearchMessageInputValue: commonActions.setSearchMessageInputValue,
  toggleSearchMessagePanelVisibility: uiActions.toggleSearchMessagePanelVisibility,
  setSearchMessagePanelVisibility: uiActions.setSearchMessagePanelVisibility,
  setSidebarVisibility: uiActions.setSidebarVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader)
