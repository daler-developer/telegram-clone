import pt from 'prop-types'
import { connect } from 'react-redux'
import { selectUser } from 'redux/reducers/authReducer'
import { selectSearchMessageInputValue } from 'redux/reducers/commonReducer'


const MessagesItem = (props) => {
  return (
    <li
      className={`messages-item
        ${!props.belongsToCurrentUser && 'messages-item--reversed'}
        ${props.belongsToCurrentUser ? 'messages-item--align-right' : 'messages-item--align-left'}
      `}
    >
      <div
        className={`messages-item__message
          ${props.belongsToCurrentUser && 'messages-item__message--green'}
          ${props.searchMessageInputValue.trim() && props.text.includes(props.searchMessageInputValue) && 'messages-item__message--blue-border'}
        `}
      >
        <span className="messages-item__message-author">
          {props.author.displayName}
        </span>
        <p className="messages-item__message-text">
          {props.text}
        </p>
        {props.photoURL && (
          <img src={props.photoURL} className="messages-item__message-photo" />
        )}
        <span className="messages-item__message-created-date">
          {new Date(props.timestamp).toDateString()}
        </span>
      </div>
      <img src={props.author.photoURL} className="messages-item__photo" />
    </li>
  )
}

MessagesItem.propTypes = {
  text: pt.string.isRequired,
  photoURL: pt.string,
  createdDate: pt.object.isRequired,
  author: pt.object.isRequired,
  belongsToCurrentUser: pt.bool.isRequired,
  timestamp: pt.number.isRequired
}

const mapStateToProps = (state) => ({
  user: selectUser(state),
  searchMessageInputValue: selectSearchMessageInputValue(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesItem)
