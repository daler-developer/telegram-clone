import { connect } from 'react-redux'
import { messagesActions, selectIsMessagesLoading, selectMessages } from 'redux/reducers/messagesReducer'
import ChatHeader from './ChatHeader'
import MessagesItem from './MessagesItem'
import SendMessageForm from './SendMessageForm'


const Chat = (props) => {
  return (
    <div className="chat">
      <ChatHeader />

      <div className="chat__body">
        {props.isLoading && <div className="chat__loader" />}
        <ul className="chat__messages-list">
          {
            <MessagesItem
              text={'Hello World'}
              alignment="left"
              photoURL={null}
              isGreen={false}
              createdDate={{ seconds: 2200233 }}
              authorDisplayName="Saidov Daler"
            />
          }
        </ul>
      </div>

      <SendMessageForm />
    </div>
  )
}

const mapStateToProps = (state) => ({
  isLoading: selectIsMessagesLoading(state),
  messages: selectMessages(state)
})

const mapDispatchToProps = {
  setIsLoading: messagesActions.setIsLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
