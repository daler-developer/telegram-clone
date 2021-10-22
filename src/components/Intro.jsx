import { connect } from "react-redux"
import { selectSidebarVisibility, uiActions } from "redux/reducers/uiReducer"

const Intro = (props) => {
  
  const handleSelectChatBtnClick = () => {
    props.toggleSidebarVisibility()
  }

  return (
    <div className={'intro'}>
      <img src="https://web.telegram.org/z/favicon.svg" className={'intro__logo'} />
      <h1 className={'intro__title h4'}>
        Welcome to Telegram clone
      </h1>
      <button className="intro__select-chat-btn" onClick={handleSelectChatBtnClick}>
        Select chat
      </button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  sidebarVisibility: selectSidebarVisibility(state)
})

const mapDispatchToProps = {
  toggleSidebarVisibility: uiActions.toggleSidebarVisibility
}


export default connect(mapStateToProps, mapDispatchToProps)(Intro)
