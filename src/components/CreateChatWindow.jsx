import { connect } from 'react-redux'
import { selectCreateChatWindowVisibility, uiActions } from 'redux/reducers/uiReducer'
import Shade from './Shade'


const CreateChatWindow = (props) => {

  const photos = [
    {
      url: 'https://avatars.dicebear.com/api/bottts/:seed.svg'
    },
    {
      url: 'https://avatars.dicebear.com/api/croodles/:seed.svg'
    },
    {
      url: 'https://avatars.dicebear.com/api/initials/:seed.svg'
    },
    {
      url: 'https://avatars.dicebear.com/api/bottts/:seed.svg'
    },
    {
      url: 'https://avatars.dicebear.com/api/bottts/:seed.svg'
    },
  ]

  return <>
    <div className={`create-chat-window ${!props.visibility && 'create-chat-window--hidden'}`}>
      <h2 className={'create-chat-window__title h5'}>
        Create Chat
      </h2>
      <form className={'create-chat-window__form'}>
        <input
          className={'create-chat-window__input'}
          placeholder={'Type chat name'}
        />
        <ul className={'create-chat-window__photos'}>
          {photos.map((photo, i) => (
            <li className={'create-chat-window__photos-item'} key={i}>
              <img className={'create-chat-window__photo'} src={photo.url} />
            </li>
          ))}
        </ul>
      </form>
    </div>
    <Shade visibility={props.visibility} onClick={props.toggleCreateChatWindowVisibility} />
  </>
}

const mapStateToProps = (state) => ({
  visibility: selectCreateChatWindowVisibility(state)
})

const mapDispatchToProps = {
  toggleCreateChatWindowVisibility: uiActions.toggleCreateChatWindowVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChatWindow)
