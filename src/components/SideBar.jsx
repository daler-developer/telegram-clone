import { connect } from 'react-redux'
import { commonActions, selectSearchChatInputValue } from 'redux/reducers/commonReducer'
import { uiActions } from 'redux/reducers/uiReducer'


const SideBar = (props) => {

  const chats = [
    {
      name: 'Inha university',
      lastMessage: 'Hello World',
      photoURL: ''
    },
    {
      name: 'West university',
      lastMessage: 'You are bad',
      photoURL: ''
    },
  ]

  const handleOpenCreateChatWindow = () => {
    props.toggleCreatChatWindowVisibility()
  }

  return (
    <div className={'side-bar'}>
      <div className={'side-bar__header'}>
        <img
          className={'side-bar__avatar'}
          src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7MyAKB_IiXFjmaBfmcIsLSeampngsst29VQ&usqp=CAU'}
        />
        <ul className={'side-bar__header-actions'}>
          <li className={'side-bar__header-action'}>
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
        {chats.map((chat, i) => (
          <li className={'side-bar__chat'} key={i}>
            <img className={'side-bar__chat-photo-url'} />
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
  searchChatInputValue: selectSearchChatInputValue(state)
})

const mapDispatchToProps = {
  toggleCreatChatWindowVisibility: uiActions.toggleCreateChatWindowVisibility,
  setSearchChatInputValue: commonActions.setSearchChatInputValue
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
