import pt from 'prop-types'
import { connect } from 'react-redux'
import { selectUser } from 'redux/reducers/authReducer'


const MessagesItem = (props) => {
  return (
    <li
      className={`messages-item
        ${props.alignment === 'left' ? 'messages-item--align-left' : 'messages-item--align-right'}
        ${props.highlighted && 'messages-item--highlighted'}
      `}
    >
      <div className={`messages-item__message ${props.isGreen && 'messages-item__message--green'}`}>
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
      <img src={props.user.photoURL} className="messages-item__photo" />
    </li>
  )
}

MessagesItem.propTypes = {
  text: pt.string.isRequired,
  photoURL: pt.string,
  createdDate: pt.object.isRequired,
  author: pt.object.isRequired,
  isGreen: pt.bool.isRequired,
  alignment: pt.oneOf(['left', 'right']).isRequired,
  timestamp: pt.number.isRequired,
  highlighted: pt.bool.isRequired
}

const mapStateToProps = (state) => ({
  user: selectUser(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesItem)
