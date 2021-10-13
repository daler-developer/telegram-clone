import pt from 'prop-types'
import { connect } from 'react-redux'
import { selectSearchMessageInputValue } from 'redux/reducers/commonReducer'


const ChatMessage = (props) => {

  const date = new Date(props.created * 1000).toUTCString()

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
      <span className={'chat-message__date-created'}>
        {date}
      </span>
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

const mapStateToProps = (state) => ({
  searchMessageInputValue: selectSearchMessageInputValue(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage)
