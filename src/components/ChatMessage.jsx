import pt from 'prop-types'


const ChatMessage = (props) => {
  return (
    <div className={`chat-message ${props.isGreen && 'chat-message--green'}`}>
      <span className={'chat-message__author'}>
        {props.author}
      </span>
      <span className={'chat-message__text'}>
        {props.text}
      </span>
      {props.photoURL && (
        <img src={props.photoURL} className={'chat-message__photo'} />
      )}
      {/* <span className={'chat-message__date-created'}>
        {props.dateCreated.toString()}
      </span> */}
    </div>
  )
}

ChatMessage.propTypes = {
  text: pt.string.isRequired,
  photoURL: pt.string,
  author: pt.string.isRequired,
  dateCreated: pt.object.isRequired,
  isGreen: pt.bool.isRequired,
}

export default ChatMessage
