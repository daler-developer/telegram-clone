import { signOut } from '@firebase/auth'
import { collection, onSnapshot, query } from '@firebase/firestore'
import { auth, db } from 'firebase'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { selectUser } from 'redux/reducers/authReducer'
import { chatsActions, selectChats, selectSelectedChatIndex } from 'redux/reducers/chatsReducer'
import { commonActions, selectSearchChatInputValue } from 'redux/reducers/commonReducer'
import { uiActions } from 'redux/reducers/uiReducer'


const SideBar = (props) => {

  useEffect(() => {

    const q = query(collection(db, '/chats'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        const { name, photoURL, lastMessage } = data
        chats.push({ id: doc.id, name, photoURL, lastMessage })
      })
      props.setChats({ chats })
    })

    return () => unsubscribe()
  }, [])

  const handleOpenCreateChatWindow = () => {
    props.toggleCreatChatWindowVisibility()
  }
  
  const handleLogout = () => {
    signOut(auth)
  }

  const handleSetSelectedChatIndex = (i) => {
    props.setSelectedChatIndex({ to: i })
  }

  return (
    <div className={'side-bar'}>
      <div className={'side-bar__header'}>
        <div className={'side-bar__header-left'}>
          <img
            className={'side-bar__avatar'}
            alt={'Wait'}
            src={props.currentUser.photoURL}
          />
          <span className={'side-bar__display-name'}>
            {props.currentUser.displayName}
          </span>
          <span className={'side-bar__status'}>
            Online
          </span>
        </div>
        <ul className={'side-bar__header-actions'}>
          <li className={'side-bar__header-action'} onClick={handleLogout}>
            <i className={" side-bar__header-icon fas fa-sign-out-alt"}></i>
          </li>
        </ul>
      </div>
      <div className={'side-bar__search-panel'}>
        <i className={"side-bar__search-icon fas fa-search"}></i>
        <input
          className={'side-bar__search-input'}
          placeholder={'Search Chat'}
          value={props.searchChatInputValue}
          onChange={(e) => props.setSearchChatInputValue({ to: e.target.value })}
        />
      </div>
      <button className={'side-bar__add-chat-btn'} onClick={handleOpenCreateChatWindow}>
        Add new Chat
      </button>
      <ul className={'side-bar__chats'}>
        {props.chats.map((chat, i) => (
          <li
            className={`side-bar__chat ${props.selectedChatIndex === i && 'side-bar__chat--selected'}`}
            key={chat.id}
            onClick={() => handleSetSelectedChatIndex(i)}
          >
            <img className={'side-bar__chat-photo-url'} src={chat.photoURL} />
            <span className={'side-bar__chat-name'}>
              {chat.name}
            </span>
            <span className={'side-bar__chat-last-message'}>
              {chat.lastMessage}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  searchChatInputValue: selectSearchChatInputValue(state),
  currentUser: selectUser(state),
  chats: selectChats(state),
  selectedChatIndex: selectSelectedChatIndex(state)
})

const mapDispatchToProps = {
  toggleCreatChatWindowVisibility: uiActions.toggleCreateChatWindowVisibility,
  setSearchChatInputValue: commonActions.setSearchChatInputValue,
  setChats: chatsActions.setChats,
  setSelectedChatIndex: chatsActions.setSelectedChatIndex
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
