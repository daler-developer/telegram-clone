import { arrayRemove, arrayUnion, collection, doc, onSnapshot, orderBy, query, updateDoc } from '@firebase/firestore'
import { db } from 'firebase'
import usePrevious from 'hooks/usePrevious'
import { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { selectUser } from 'redux/reducers/authReducer'
import { selectSelectedChatId } from 'redux/reducers/chatsReducer'
import { selectSearchMessageInputValue } from 'redux/reducers/commonReducer'
import { messagesActions, selectIsMessagesLoading, selectMessages } from 'redux/reducers/messagesReducer'
import ChatHeader from './ChatHeader'
import MessagesItem from './MessagesItem'
import SendMessageForm from './SendMessageForm'


const Chat = (props) => {
  const previousSelectedChatId = usePrevious(props.selectedChatId)

  const chatBodyRef = useRef(null)

  useEffect(() => props.setIsLoading({ to: true }), [props.selectedChatId])

  useEffect(() => {
    props.setMessages({ list: [] })
    const q = query(collection(db, `chats/${props.selectedChatId}/messages`), orderBy('createdDate'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        const message = {
          id: doc.id,
          text: data.text,
          photoURL: data.photoURL,
          createdDate: { seconds: data.createdDate?.seconds },
          author: {
            displayName: data.author.displayName,
            uid: data.author.uid,
            photoURL: data.author.photoURL
          },
          timestamp: data.timestamp
        }
        messages.push(message)
      })
      props.setMessages({ list: messages })
      props.setIsLoading({ to: false })
    })

    return () => unsubscribe()
  }, [props.selectedChatId])

  useEffect(async () => {
    await updateDoc(doc(db, `/chats/${props.selectedChatId}`), {
      onlineList: arrayUnion(props.user.displayName)
    })
    if (previousSelectedChatId) {
      await updateDoc(doc(db, `/chats/${previousSelectedChatId}`), {
        onlineList: arrayRemove(props.user.displayName)
      })
    }
  }, [props.selectedChatId])

  useEffect(() => {
    chatBodyRef.current.scrollTo(0, chatBodyRef.current.scrollHeight)
  }, [props.messages])

  return (
    <div className="chat">
      <ChatHeader />

      <div className="chat__body" ref={chatBodyRef}>
        {props.isLoading && <div className="chat__loader" />}
        <ul className="chat__messages-list">
          {
            props.messages.map((message) => (
              <MessagesItem
                key={message.id}
                text={message.text}
                photoURL={message.photoURL}
                createdDate={message.createdDate}
                author={message.author}
                belongsToCurrentUser={message.author.uid === props.user.uid}
                timestamp={message.timestamp}
              />
            ))
          }
        </ul>
      </div>

      <SendMessageForm />
    </div>
  )
}

const mapStateToProps = (state) => ({
  isLoading: selectIsMessagesLoading(state),
  messages: selectMessages(state),
  selectedChatId: selectSelectedChatId(state),
  user: selectUser(state),
  searchMessageInputValue: selectSearchMessageInputValue(state)
})

const mapDispatchToProps = {
  setIsLoading: messagesActions.setIsLoading,
  setMessages: messagesActions.setMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
