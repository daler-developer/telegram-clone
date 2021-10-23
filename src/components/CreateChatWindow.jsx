import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { selectCreateChatWindowVisibility, uiActions } from "redux/reducers/uiReducer"
import Shade from "./Shade"

import photo01 from 'assets/avatars/01.svg'
import photo02 from 'assets/avatars/02.svg'
import photo03 from 'assets/avatars/03.svg'
import photo04 from 'assets/avatars/04.svg'
import { addDoc, collection } from "@firebase/firestore"
import { db } from "firebase"
import { chatsActions } from "redux/reducers/chatsReducer"


const CreateChatWindow = (props) => {
  const [chatNameInputValue, setChatNameInputValue] = useState('')
  const [selectedPhotoURL, setSelectedPhotoURL] = useState(photo01)
  const [emptyChatNameError, setEmptyChatNameError] = useState(false)

  const chatNameInputRef = useRef(null)

  const photos = [photo01, photo02, photo03, photo04]

  useEffect(() => {
    if (props.visibility) {
      // focusInput()
    }
  }, [props.visibility])

  const createChat = async () => {
    const chat = {
      name: chatNameInputValue,
      photoURL: selectedPhotoURL,
      onlineList: [],
      lastMessage: null
    }

    return await addDoc(collection(db, 'chats'), chat)
  }

  const changeSelectedChatId = (to) => {
    props.setSelectedChatId({ to })
  }

  const focusInput = () => {
    chatNameInputRef.current?.focus()
  }

  const resetWindow = () => {
    setChatNameInputValue('')
    setSelectedPhotoURL(photo01)
    setEmptyChatNameError(false)
  }

  const closeWindow = () => {
    props.toggleCreateChatWindowVisibility()
  }

  const handleShadeClick = () => {
    resetWindow()
    closeWindow()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!chatNameInputValue.trim()) {
      setEmptyChatNameError(true)
    } else {
      createChat().then((result) => changeSelectedChatId(result.id))
      resetWindow()
      closeWindow()
    }
  }

  const handlePhotoItemClick = (e, to) => {
    setSelectedPhotoURL(to)
  }

  return <>
    <div className={`create-chat-window ${!props.visibility && 'create-chat-window--hidden'}`}>
      <h2 className={'create-chat-window__title h3'}>
        Create Chat
      </h2>
      <form className="create-chat-window__form" onSubmit={handleSubmit}>
        <input
          className={`create-chat-window__chat-name-input ${emptyChatNameError && 'create-chat-window__chat-name-input--error'}`}
          value={chatNameInputValue}
          onChange={(e) => setChatNameInputValue(e.target.value)}
          placeholder="Type chat name"
          ref={chatNameInputRef}
        />
        <ul className="create-chat-window__photos-list">
          {
            photos.map((photo, i) => (
              <li className={`create-chat-window__photos-item`} onClick={(e) => handlePhotoItemClick(e, photo)} key={i}>
                <img src={photo}  className={`create-chat-window__photo ${selectedPhotoURL === photo && '_create-chat-window__photo--selected'}`} />
                <div className={`create-chat-window__selected-label ${!(selectedPhotoURL === photo) && 'create-chat-window__selected-label--hidden'}`}></div>
              </li>
            ))
          }
        </ul>
        <button type="submit" className="create-chat-window__submit-btn">
          Create
        </button>
      </form>
    </div>
    <Shade visibility={props.visibility} onClick={handleShadeClick} />
  </>
}

const mapStateToProps = (state) => ({
  visibility: selectCreateChatWindowVisibility(state)
})

const mapDispatchToProps = {
  toggleCreateChatWindowVisibility: uiActions.toggleCreateChatWindowVisibility,
  setSelectedChatId: chatsActions.setSelectedChatId
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChatWindow)
