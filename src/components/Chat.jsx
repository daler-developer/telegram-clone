import { addDoc, arrayRemove, arrayUnion, collection, doc, onSnapshot, orderBy, query, serverTimestamp, Timestamp, updateDoc } from '@firebase/firestore'
import { db } from 'firebase'
import usePrevious from 'hooks/usePrevius'
import { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { selectUser } from 'redux/reducers/authReducer'
import { selectChatById, selectSelectedChatId } from 'redux/reducers/chatsReducer'
import { commonActions, selectSearchChatInputValue, selectSearchMessageInputValue } from 'redux/reducers/commonReducer'
import { messagesActions, selectFilteredMessages, selectIsMessagesLoading, selectMessages } from 'redux/reducers/messagesReducer'
import ChatMessage from './ChatMessage'


const Chat = (props) => {
  const prevSelectedChatId = usePrevious(props.selectedChatId)

  const searchInputRef = useRef(null)
  const footerInputRef = useRef(null)
  const fileInputRef = useRef(null)
  const photoPreviewRef = useRef(null)

  const [messageTextValue, setMessageTextValue] = useState('')
  const [fileSelected, setFileSelected] = useState(false)
  const [fileData, setFileData] = useState(null)

  const handleSearchSearchBtnClick = () => {
    searchInputRef.current.focus()
  }

  useEffect(() => {
    if (fileData) {

      setTimeout(() => {
        photoPreviewRef.current?.classList.add('chat__photo-preview--hidden')
      }, 1000)

      // photoPreviewRef.current?.addEventListener('mouseover', (e) => {
      //   photoPreviewRef.current.classList.remove('chat__photo-preview--hidden')
      // })
  
      // photoPreviewRef.current?.addEventListener('mouseout', (e) => {
      //   photoPreviewRef.current.classList.add('chat__photo-preview--hidden')
      // })

    } else {

    }

  }, [fileData])

  useEffect(() => {
    window.onbeforeunload = () => {
      updateDoc(doc(db, '/chats', props.selectedChatId), {
        usersOnline: arrayRemove(props.currentUser.displayName)
      })
    }
  }, [])

  useEffect(() => {
    footerInputRef.current.focus()
  }, [])

  useEffect(() => {
    if (props.selectedChatId) {
      props.setMessagesLoading({ to: true })
      const q = query(collection(db, `/chats/${props.selectedChatId}/messages`), orderBy('created'))
      onSnapshot(q, (snapshot) => {
        const messages = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          const { authorUID, authorName, created, photo, text } = data
          messages.push({ authorUID, authorName, created: created?.seconds, photo, text })
        })
        props.setMessages({ messages })
        props.setMessagesLoading({ to: false })
      })
    }
  }, [props.selectedChatId])

  useEffect(() => {
    if (props.selectedChatId) {
      const chatEntering = doc(db, '/chats', props.selectedChatId)
      const chatLeaving = prevSelectedChatId ? doc(db, '/chats', prevSelectedChatId) : null

      if (chatLeaving) {
        updateDoc(chatLeaving, {
          usersOnline: arrayRemove(props.currentUser.displayName)
        })
      }

      updateDoc(chatEntering, {
        usersOnline: arrayUnion(props.currentUser.displayName)
      })
    }

    return () => {
      updateDoc(doc(db, '/chats', props.selectedChatId), {
        usersOnline: arrayRemove(props.currentUser.displayName)
      })
    }
  }, [props.selectedChatId])

  const resetForm = () => {
    setMessageTextValue('')
    setFileData(null)
    fileInputRef.current.value = null
  }

  const handleSendMessage = async (e) => {
    if (e.key === 'Enter') {
      await addDoc(collection(db, `/chats/${props.selectedChatId}/messages`), {
        text: messageTextValue,
        authorName: props.currentUser.displayName,
        authorUID: props.currentUser.uid,
        created: serverTimestamp(),
        photo: fileData
      })

      const currentFirebaseChat = doc(db, 'chats', props.selectedChat.id)

      await updateDoc(currentFirebaseChat, {
        lastMessage: messageTextValue
      })

      resetForm()
    }
  }

  const handleOpenFileWindow = () => {
    fileInputRef.current.click()
  }

  const handleFileInputChange = (e) => {
    if (e.target.files !== 0) {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])

      reader.onload = () => {
        setFileData(reader.result)
      }

      setFileSelected(true)
    } else {
      setFileSelected(false)
      setFileData(null)
    }
  }

  return (
    <div className={'chat'}>
      {/* Header */}
      <div className={'chat__header'}>
        <img className={'chat__header-img'} src={props.selectedChat?.photoURL} />
        <div className={'chat__header-body'}>
          <span className={'chat__name'}>
            {props.selectedChat.name}
          </span>
          <span className={'chat__date'}>
            Online: {props.selectedChat.usersOnline.map((el, i) => {
              const isLast = props.selectedChat.usersOnline.length === i + 1
              return `${el}${!isLast ? ',' : ''} `
            })}
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
        {props.isMessagesLoading && (
          <div className={'chat__loader'}></div>
        )}
        <ul className={'chat__messages-list'}>
          {props.messages.map((m, i) => (
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
        <img
          className={'chat__photo-preview'}
          src={fileData}
          ref={photoPreviewRef}
        />
        <i
          className={`chat__footer-icon chat__footer-photo-icon ${fileData && 'chat__footer-photo-icon--active'} far fa-image`}
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
          ref={fileInputRef}
          hidden
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
  filteredMessages: selectFilteredMessages(state),
  selectedChat: selectChatById(state, selectSelectedChatId(state)),
  isMessagesLoading: selectIsMessagesLoading(state)
})

const mapDispatchToProps = {
  setSearchMessageInputValue: commonActions.setSearchMessageInputValue,
  setMessages: messagesActions.setMessages,
  setMessagesLoading: messagesActions.setIsLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
