import { collection, onSnapshot, query } from '@firebase/firestore'
import { db } from 'firebase'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { selectUser } from 'redux/reducers/authReducer'
import { selectSelectedChatId } from 'redux/reducers/chatsReducer'
import { messagesActions, selectIsMessagesLoading, selectMessages } from 'redux/reducers/messagesReducer'
import ChatHeader from './ChatHeader'
import MessagesItem from './MessagesItem'
import SendMessageForm from './SendMessageForm'


const Chat = (props) => {

  useEffect(() => {
    const q = query(collection(db, `chats/${props.selectedChatId}/messages`))
    onSnapshot(q, (snapshot) => {
      const messages = []
      snapshot.forEach((doc) => {
        const { id } = doc
        const { author, createdDate, text, photoURL } = doc.data()
        const { seconds, nanoseconds} = createdDate
        messages.push({ id, author, createdDate: { seconds, nanoseconds }, text, photoURL })
      })
      props.setMessages({ list: messages })
    })
  }, [props.selectedChatId])

  return (
    <div className="chat">
      <ChatHeader />

      <div className="chat__body">
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
                isGreen={message.author.uid === props.user.uid ? true : false}
                alignment={message.author.uid === props.user.uid ? 'right' : 'left'}
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
  user: selectUser(state)
})

const mapDispatchToProps = {
  setIsLoading: messagesActions.setIsLoading,
  setMessages: messagesActions.setMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
