import { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { selectUser } from 'redux/reducers/authReducer'
import { selectChats, selectSelectedChatId } from 'redux/reducers/chatsReducer'
import { uiActions } from 'redux/reducers/uiReducer'
import ChatsItem from './ChatsItem'


const Sidebar = (props) => {
  const [searchInputValue, setSearchInputValue] = useState('')

  const searchPanelRef = useRef(null)

  const handleSearchInputFocus = (e) => {
    searchPanelRef.current.classList.add('sidebar__search-panel--active')
  }

  const handleAddChatBtnClick = () => {
    props.toggleCreateChatWindowVisibility()
  }

  return (
    <div className="sidebar">
      {/* Header */}
      <div className="sidebar__header">
        <img className="sidebar__header-avatar" src={props.user.photoURL} />
        <span className="sidebar__header-display-name">
          {props.user.displayName}
        </span>
        <span className="sidebar__header-status">
          Online
        </span>
      </div>
      {/* Search */}
      <div className="sidebar__search-panel-wrapper">
        <div className="sidebar__search-panel" ref={searchPanelRef}>
          <i className="sidebar__search-icon fas fa-search"></i>
          <input
            className="sidebar__search-input"
            placeholder="Search chat"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            onFocus={handleSearchInputFocus}
          />
        </div>
      </div>
      {/* Chats */}
      <ul className="sidebar__chats-list">
        {
          props.chats.map((chat) => (
            <ChatsItem
              key={chat.id}
              id={chat.id}
              name={chat.name}
              lastMessage={chat.lastMessage}
              photoURL={chat.photoURL}
              isActive={props.selectedChatId === chat.id ? true : false}
            />
          ))
        }
      </ul>
      {/* Add Chat btn */}
      <button className="sidebar__add-chat-btn" type="button" onClick={handleAddChatBtnClick}>
        Add new chat
      </button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: selectUser(state),
  chats: selectChats(state),
  selectedChatId: selectSelectedChatId(state)
})

const mapDispatchToProps = {
  toggleCreateChatWindowVisibility: uiActions.toggleCreateChatWindowVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
