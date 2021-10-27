import { signOut } from '@firebase/auth'
import { collection, onSnapshot, query } from '@firebase/firestore'
import { auth, db } from 'firebase'
import { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { selectUser } from 'redux/reducers/authReducer'
import { chatsActions, selectChatsByNameIncludes, selectIsChatsLoading, selectSelectedChatId } from 'redux/reducers/chatsReducer'
import { commonActions, selectSearchChatInputValue } from 'redux/reducers/commonReducer'
import { selectSidebarVisibility, uiActions } from 'redux/reducers/uiReducer'
import ChatsItem from './ChatsItem'
import Shade from './Shade'


const Sidebar = (props) => {
  const searchPanelRef = useRef(null)
  const searchInput = useRef(null)

  const [isSearchPanelActive, setIsSearchPanelActive] = useState(false)

  useEffect(() => {
    props.setIsLoading({ to: true })
  }, [])

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!e.target.contains(searchInput.current)) {
        setIsSearchPanelActive(false)
      }
    })
  }, [])

  useEffect(() => {
    const q = query(collection(db, 'chats'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats = []
      snapshot.forEach((doc) => {
        const { id } = doc
        const { name, lastMessage, onlineList, photoURL } = doc.data()
        chats.push({ id, name, lastMessage, onlineList, photoURL })
      })
      props.setChats({ list: chats })
      props.setIsLoading({ to: false })
    })
    
    return () => unsubscribe()
  }, [])

  const closeSidebar = () => {
    props.setSidebarVisibility({ to: false })
  }

  const handleSearchInputFocus = (e) => {
    setIsSearchPanelActive(true)
  }

  const handleAddChatBtnClick = () => {
    props.toggleCreateChatWindowVisibility()
    closeSidebar()
  }
  
  const handleLogoutBtnClick = () => {
    signOut(auth)
  }

  const handleShadeClick = () => {
    closeSidebar()
  }

  return <>
    <div className={`sidebar ${!props.visibility && 'sidebar--hidden'}`}>
      {/* Header */}
      <div className="sidebar__header">
        <div className="sidebar__header-left">
          <img className="sidebar__header-avatar" src={props.user.photoURL} />
          <span className="sidebar__header-display-name">
            {props.user.displayName}
          </span>
          <span className="sidebar__header-status">
            Online
          </span>
        </div>
        <button className="sidebar__logout-btn" onClick={handleLogoutBtnClick}>
          <span className="sidebar__logout-icon material-icons-outlined">
            logout
          </span>
        </button>
      </div>
      {/* Search */}
      <div className="sidebar__search-panel-wrapper">
        <div className={`sidebar__search-panel ${isSearchPanelActive && 'sidebar__search-panel--active'}`} ref={searchPanelRef}>
          <span className="sidebar__search-icon material-icons-outlined">
            search
          </span>
          <input
            ref={searchInput}
            className="sidebar__search-input"
            placeholder="Search chat"
            value={props.searchChatInputValue}
            onChange={(e) => props.setSearchChatInputValue({ to: e.target.value })}
            onFocus={handleSearchInputFocus}
          />
        </div>
      </div>
      {/* Chats */}
      {props.isLoading && <div className="sidebar__loader" />}
      <ul className="sidebar__chats-list">
        {
          props.filteredChats.map((chat) => (
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

    <Shade visibility={props.visibility} onClick={handleShadeClick} />
  </>
}

const mapStateToProps = (state) => ({
  user: selectUser(state),
  selectedChatId: selectSelectedChatId(state),
  isLoading: selectIsChatsLoading(state),
  filteredChats: selectChatsByNameIncludes(state, selectSearchChatInputValue(state)),
  searchChatInputValue: selectSearchChatInputValue(state),
  visibility: selectSidebarVisibility(state)
})

const mapDispatchToProps = {
  toggleCreateChatWindowVisibility: uiActions.toggleCreateChatWindowVisibility,
  setIsLoading: chatsActions.setIsLoading,
  setSearchChatInputValue: commonActions.setSearchChatInputValue,
  setChats: chatsActions.setChats,
  toggleVisibility: uiActions.toggleSidebarVisibility,
  setSidebarVisibility: uiActions.setSidebarVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
