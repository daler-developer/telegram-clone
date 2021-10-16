import pt from 'prop-types'
import { connect } from 'react-redux'
import { chatsActions } from 'redux/reducers/chatsReducer'


const ChatsItem = (props) => {

  const handleChatItemClick = () => {
    props.setSelectedChatId({ to: props.id })
  }

  return (
    <li className={`chats-item ${props.isActive && 'chats-item--selected'}`} onClick={handleChatItemClick}>
      <img 
        src={props.photoURL}
        className="chats-item__photo"
      />
      <span className="chats-item__name">
        {props.name}
      </span>
      <span className="chats-item__last-message">
        <span className="chats-item__last-message-author">
          {props.lastMessage.authorDisplayName}: {' '}
        </span>
        <span className="chats-item__last-message-text">
          {props.lastMessage.text}
        </span>
      </span>
    </li>
  )
}

ChatsItem.propTypes = {
  id: pt.string.isRequired,
  name: pt.string.isRequired,
  photoURL: pt.string.isRequired,
  lastMessage: pt.shape({
    text: pt.string,
    authorDisplayName: pt.string
  }),
  isActive: pt.bool.isRequired
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  setSelectedChatId: chatsActions.setSelectedChatId
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsItem)
