import { addDoc, collection } from '@firebase/firestore'
import { db } from 'firebase'
import { useState } from 'react'
import { connect } from 'react-redux'
import { selectCreateChatWindowVisibility, uiActions } from 'redux/reducers/uiReducer'
import Shade from './Shade'

import avatar01 from 'assets/avatars/01.jpg'
import avatar02 from 'assets/avatars/02.png'
import avatar03 from 'assets/avatars/03.png'
import avatar04 from 'assets/avatars/04.jpg'


const CreateChatWindow = (props) => {
  const [selectedAvatarURL, setSelectedAvatarURL] = useState(avatar01)
  const [inputValue, setInputValue] = useState('')

  const avatars = [avatar01, avatar02, avatar03, avatar04]

  const handleCloseWindow = () => {
    props.toggleCreateChatWindowVisibility()
  }

  const handleChangeSelectedAvatar = (to) => {
    setSelectedAvatarURL(to)
  }

  const handleCreateChat = (e) => {
    e.preventDefault()

    addDoc(collection(db, '/chats'), {
      name: inputValue,
      lastMessage: null,
      photoURL: selectedAvatarURL,
      usersOnline: []
    })

    handleCloseWindow()
  }

  return <>
    <div className={`create-chat-window ${!props.visibility && 'create-chat-window--hidden'}`}>
      <h2 className={'create-chat-window__title h5'}>
        Create Chat
      </h2>
      <form className={'create-chat-window__form'} onSubmit={handleCreateChat}>
        <input
          className={'create-chat-window__input'}
          placeholder={'Type chat name'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <ul className={'create-chat-window__avatars'}>
          {avatars.map((avatar, i) => (
            <li className={`create-chat-window__avatars-item`} key={i}>
              <img
                className={`create-chat-window__avatar ${selectedAvatarURL === avatar && 'create-chat-window__avatar--selected'}`}
                src={avatar}
                onClick={() => handleChangeSelectedAvatar(avatar)}
              />
            </li>
          ))}
        </ul>
        <button type={'submit'} className={'create-chat-window__submit-btn'}>
          Create
        </button>
      </form>
    </div>
    <Shade visibility={props.visibility} onClick={handleCloseWindow} />
  </>
}

const mapStateToProps = (state) => ({
  visibility: selectCreateChatWindowVisibility(state)
})

const mapDispatchToProps = {
  toggleCreateChatWindowVisibility: uiActions.toggleCreateChatWindowVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChatWindow)
