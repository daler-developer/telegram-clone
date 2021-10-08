import { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { commonActions, selectSearchChatInputValue, selectSearchMessageInputValue } from 'redux/reducers/commonReducer'
import ChatMessage from './ChatMessage'


const Chat = (props) => {
  const searchInputRef = useRef(null)
  const footerInputRef = useRef(null)

  const handleSearchSearchBtnClick = () => {
    searchInputRef.current.focus()
  }

  useEffect(() => {
    footerInputRef.current.focus()
  }, [])

  const messages = [
    {
      text: 'Hello World',
      author: 'Saidov Daler',
      dateCreated: new Date(),
      alignment: 'left',
      photoURL: 'https://picsum.photos/id/237/600/300'
    },
    {
      text: 'Hello World',
      author: 'Saidov Daler',
      dateCreated: new Date(),
      alignment: 'left',
    },
    {
      text: 'Hello World',
      author: 'Saidov Daler',
      dateCreated: new Date(),
      alignment: 'right',
      photoURL: 'https://picsum.photos/id/211/200/300'
    },
  ]

  return (
    <div className={'chat'}>
      {/* Header */}
      <div className={'chat__header'}>
        <img className={'chat__header-img'} />
        <div className={'chat__header-body'}>
          <span className={'chat__name'}>
            Westminster university
          </span>
          <span className={'chat__date'}>
            Last seen on Tuesday
          </span>
        </div>
        <div className={'chat__header-btns'}>
          <button className={'chat__header-btn chat__header-search-btn'} onClick={handleSearchSearchBtnClick}>
            <i className={"chat__header-icon chat__header-search-icon fas fa-search"}></i>
            <input
              placeholder={'Search something'}
              className={'chat__header-search-input'}
              ref={searchInputRef}
              value={props.searchMessageInputValue}
              onChange={(e) => props.setSearchMessageInputValue({ to: e.target.value })}
            />
          </button>
        </div>
      </div>
      {/* Body */}
      <div className={'chat__body'}>
        <ul className={'chat__messages-list'}>
          {messages.map((m, i) => (
            <li className={`chat__messages-item ${m.alignment === 'left' ? 'chat__messages-item--left' : 'chat__messages-item--right'}`} key={i}>
              <ChatMessage
                text={m.text}
                author={m.author}
                dateCreated={m.dateCreated}
                photoURL={m.photoURL}
                isGreen={m.alignment === 'left' ? false : true}
              />
            </li>
          ))}
        </ul>
      </div>
      {/* Footer */}
      <div className={'chat__footer'}>
        <i className={'chat__footer-icon far fa-image'}></i>
        <input
          placeholder={'Type something...'}
          className={'chat__footer-input'}
          ref={footerInputRef}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  searchMessageInputValue: selectSearchMessageInputValue(state)
})

const mapDispatchToProps = {
  setSearchMessageInputValue: commonActions.setSearchMessageInputValue
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
