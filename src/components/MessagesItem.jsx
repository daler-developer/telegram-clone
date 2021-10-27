import { getDownloadURL, ref } from '@firebase/storage'
import { storage } from 'firebase'
import pt from 'prop-types'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { selectUser } from 'redux/reducers/authReducer'
import { selectSearchMessageInputValue } from 'redux/reducers/commonReducer'


const MessagesItem = (props) => {
  const [URL, setURL] = useState(null)
  const [isPhotoLoading, setIsPhotoLoading] = useState(true)

  useEffect(() => {
    if (props.photoRef) {
      getDownloadURL(ref(storage, props.photoRef)).then((result) => {
        setURL(result)
        setIsPhotoLoading(false)
      })
    }
  }, [])

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
        {props.photoRef && !isPhotoLoading && (
          <img src={URL} className="messages-item__message-photo" />
        )}
        {props.photoRef && isPhotoLoading && (
          <div className="messages-item__loader"></div>
        )}
        <span className="messages-item__message-created-date">
          {`${new Date(props.timestamp).getHours()}:${new Date(props.timestamp).getMinutes()}`}
        </span>
      </div>
      <img src={props.author.photoURL} className="messages-item__photo" />
    </li>
  )
}

MessagesItem.propTypes = {
  text: pt.string.isRequired,
  photoURL: pt.string,
  photoRef: pt.string,
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
