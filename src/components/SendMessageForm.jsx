import { addDoc, serverTimestamp } from '@firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { selectUser } from 'redux/reducers/authReducer'
import { selectSelectedChatId } from 'redux/reducers/chatsReducer'
import PhotoPreview from './PhotoPreview'


const SendMessageForm = (props) => {
  const [messageInputValue, setMessageInputValue] = useState('')
  const [submitBtnHidden, setSubmitBtnHidden] = useState(true)
  const [fileData, setFileData] = useState(null)
  const [isPhotoPreviewHidden, setIsPhotoPreviewHidden] = useState(true)

  const fileInputRef = useRef(null)
  const messageInputRef = useRef(null)

  useEffect(() => messageInputRef.current.focus(), [props.selectedChatId])

  useEffect(() => {
    if (messageInputValue.trim()) {
      setSubmitBtnHidden(false)
    } else {
      setSubmitBtnHidden(true)
    }
  }, [messageInputValue])

  useEffect(() => {
    if (fileData) {
      showPhotoPreview()
    } else {
      hidePhotoPreview()
    }
  }, [fileData])

  const sendMessage = async () => {
    const message = {
      text: messageInputRef,
      photoURL: fileData,
      author: {
        displayName: props.user.displayName,
        uid: props.user.uid
      },
      createdDate: serverTimestamp()
    }
    await addDoc()
  }

  const deletePhoto = () => {
    setFileData(null)
    fileInputRef.current.value = null
  }

  const resetForm = () => {
    setFileData(null)
    setMessageInputValue('')
    fileInputRef.current.value = null
  }

  const hidePhotoPreview = () => {
    setIsPhotoPreviewHidden(true)
  }

  const showPhotoPreview = () => {
    setIsPhotoPreviewHidden(false)
  }

  const triggerNativeFileInputClick = () => {
    fileInputRef.current.click()
  }

  const readFileData = (fileInput) => {
    const reader = new FileReader()
    reader.readAsDataURL(fileInput.files[0])
    reader.onload = () => {
      setFileData(reader.result)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage()
    resetForm()
  }

  const handleSelectPhotoBtnClick = () => {
    triggerNativeFileInputClick()
  }

  const handleFileInputChange = (e) => {
    readFileData(e.target)
  }

  const handleDeletePhotoBtnClick = () => {
    deletePhoto()
  }

  return <>
    <form className="send-message-form" onSubmit={handleSubmit}>
      <PhotoPreview photoURL={fileData} isHidden={isPhotoPreviewHidden} onDeletePhotoBtnClick={handleDeletePhotoBtnClick} />

      <button className="send-message-form__select-photo-btn" type="button" onClick={handleSelectPhotoBtnClick}>
        <span className={`send-message-form__photo-icon material-icons-outlined ${fileData && 'send-message-form__photo-icon--file--selected'}`}>
          photo_size_select_actual
        </span>
      </button>

      <div className="send-message-form__message-input-panel">
        <input
          className="send-message-form__message-input"
          value={messageInputValue}
          onChange={(e) => setMessageInputValue(e.target.value)}
          placeholder="Type message"
          ref={messageInputRef}
        />
        <button  type="submit" className={`send-message-form__submit-btn ${submitBtnHidden && 'send-message-form__submit-btn--hidden'}`}>
          Send
        </button>
      </div>

    </form>

    <input type="file" hidden ref={fileInputRef} onChange={handleFileInputChange} />
  </>
}

const mapStateToProps = (state) => ({
  selectedChatId: selectSelectedChatId(state),
  user: selectUser(state),
  selectedChatId: selectSelectedChatId(state)
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageForm)
