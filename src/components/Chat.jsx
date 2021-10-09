import { addDoc, collection, onSnapshot, query, Timestamp } from '@firebase/firestore'
import { db } from 'firebase'
import { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { selectUser } from 'redux/reducers/authReducer'
import { selectSelectedChatId } from 'redux/reducers/chatsReducer'
import { commonActions, selectSearchChatInputValue, selectSearchMessageInputValue } from 'redux/reducers/commonReducer'
import { messagesActions, selectFilteredMessages, selectMessages } from 'redux/reducers/messagesReducer'
import ChatMessage from './ChatMessage'


const Chat = (props) => {
  const searchInputRef = useRef(null)
  const footerInputRef = useRef(null)
  const fileInputRef = useRef(null)

  const [messageTextValue, setMessageTextValue] = useState('')
  const [fileSelected, setFileSelected] = useState(false)

  const handleSearchSearchBtnClick = () => {
    searchInputRef.current.focus()
  }

  useEffect(() => {
    footerInputRef.current.focus()
  }, [])

  useEffect(() => {
    if (props.selectedChatId) {
      const q = query(collection(db, `/chats/${props.selectedChatId}/messages`))
      onSnapshot(q, (snapshot) => {
        const messages = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          const { authorUID, authorName, created, photo, text } = data
          messages.push({ authorUID, authorName, created: created?.seconds, photo, text })
        })
        props.setMessages({ messages })
      })
    }
  }, [props.selectedChatId])

  const handleSendMessage = async (e) => {
    if (e.key === 'Enter') {
      const photo = fileInputRef.current.files[0]
      let photoData = null
      
      if (fileSelected) {
        const reader = new FileReader()
  
        reader.readAsDataURL(photo)
  
        reader.onload = () => {
          photoData = reader.result
  
          addDoc(collection(db, `/chats/${props.selectedChatId}/messages`), {
            text: messageTextValue,
            authorName: props.currentUser.displayName,
            authorUID: props.currentUser.uid,
            created: Timestamp.fromDate(new Date()),
            photo: photoData
          })
        }
      } else {
        addDoc(collection(db, `/chats/${props.selectedChatId}/messages`), {
          text: messageTextValue,
          authorName: props.currentUser.displayName,
          authorUID: props.currentUser.uid,
          created: Timestamp.fromDate(new Date()),
          photo: photoData
        })
      }

      setMessageTextValue('')
    }
  }

  const handleOpenFileWindow = () => {
    fileInputRef.current.click()
  }

  const handleFileInputChange = (e) => {
    if (e.target.files !== 0) {
      setFileSelected(true)
    } else {
      setFileSelected(false)
    }
  }

  return (
    <div className={'chat'}>
      {/* Header */}
      <div className={'chat__header'}>
        <img className={'chat__header-img'} />
        <div className={'chat__header-body'}>
          <span className={'chat__name'}>
            Westminster university
          </span>
          <span className={'chat__date'}>
            Last seen on Tuesday
          </span>
        </div>
        <div className={'chat__header-btns'}>
          <button className={'chat__header-btn chat__header-search-btn'} onClick={handleSearchSearchBtnClick}>
            <i className={"chat__header-icon chat__header-search-icon fas fa-search"}></i>
            <input
              placeholder={'Search something'}
              className={'chat__header-search-input'}
              ref={searchInputRef}
              value={props.searchMessageInputValue}
              onChange={(e) => props.setSearchMessageInputValue({ to: e.target.value })}
            />
          </button>
        </div>
      </div>
      {/* Body */}
      <div className={'chat__body'}>
        <ul className={'chat__messages-list'}>
          {props.filteredMessages.map((m, i) => (
            <li className={`chat__messages-item ${m.authorUID  === props.currentUser.uid ? 'chat__messages-item--right' : 'chat__messages-item--left'}`} key={i}>
              <ChatMessage
                text={m.text}
                authorName={m.authorName}
                created={m.created}
                photo={m.photo}
                isGreen={m.authorUID  === props.currentUser.uid ? true : false}
              />
            </li>
          ))}
        </ul>
      </div>
      {/* Footer */}
      <div className={'chat__footer'}>
        <i
          className={`chat__footer-icon chat__footer-photo-icon ${fileSelected && 'chat__footer-photo-icon--active'} far fa-image`}
          onClick={handleOpenFileWindow}
        ></i>
        <input
          placeholder={'Type something...'}
          className={'chat__footer-input'}
          ref={footerInputRef}
          value={messageTextValue}
          onChange={(e) => setMessageTextValue(e.target.value)}
          onKeyDown={handleSendMessage}
        />
        <input
          type={'file'}
          hidden
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  searchMessageInputValue: selectSearchMessageInputValue(state),
  messages: selectMessages(state),
  selectedChatId: selectSelectedChatId(state),
  currentUser: selectUser(state),
  filteredMessages: selectFilteredMessages(state)
})

const mapDispatchToProps = {
  setSearchMessageInputValue: commonActions.setSearchMessageInputValue,
  setMessages: messagesActions.setMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
