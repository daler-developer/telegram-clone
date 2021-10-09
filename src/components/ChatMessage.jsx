import pt from 'prop-types'


const ChatMessage = (props) => {
  return (
    <div className={`chat-message ${props.isGreen && 'chat-message--green'}`}>
      <span className={'chat-message__author'}>
        {props.authorName}
      </span>
      <span className={'chat-message__text'}>
        {props.text}
      </span>
      {props.photo && (
        <img src={props.photo} className={'chat-message__photo'} />
      )}
      {/* <span className={'chat-message__date-created'}>
        {props.dateCreated.toString()}
      </span> */}
    </div>
  )
}

ChatMessage.propTypes = {
  text: pt.string.isRequired,
  photo: pt.string,
  authorName: pt.string.isRequired,
  created: pt.number.isRequired,
  isGreen: pt.bool.isRequired,
}

export default ChatMessage
