import pt from 'prop-types'


const MessagesItem = (props) => {
  return (
    <li className={`messages-item ${props.alignment === 'left' ? 'messages-item--align-left' : 'messages-item--align-right'}`}>
      <div className={`messages-item__message ${props.isGreen && 'messages-item__message--green'}`}>
        <span className="messages-item__message-author">
          {props.authorDisplayName}
        </span>
        <p className="messages-item__message-text">
          {props.text}
        </p>
        {props.photoURL && (
          <img src={props.photoURL} className="messages-item__message-photo" />
        )}
        <span className="messages-item__message-created-date">
          {props.createdDate.seconds}
        </span>
      </div>
    </li>
  )
}

MessagesItem.propTypes = {
  text: pt.string.isRequired,
  photoURL: pt.string,
  alignment: pt.oneOf(['left', 'right']).isRequired,
  isGreen: pt.bool.isRequired,
  createdDate: pt.object.isRequired,
  authorDisplayName: pt.string.isRequired
}

export default MessagesItem
