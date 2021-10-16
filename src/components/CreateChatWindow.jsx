import { connect } from "react-redux"
import { selectCreateChatWindowVisibility, uiActions } from "redux/reducers/uiReducer"
import Shade from "./Shade"


const CreateChatWindow = (props) => {

  const handleShadeClick = () => {
    props.toggleCreateChatWindowVisibility()
  }

  return <>
    <div className={`create-chat-window ${!props.visibility && 'create-chat-window--hidden'}`}>
      <h2 className={'create-chat-window__title h3'}>
        Create Chat
      </h2>
    </div>
    <Shade visibility={props.visibility} onClick={handleShadeClick} />
  </>
}

const mapStateToProps = (state) => ({
  visibility: selectCreateChatWindowVisibility(state)
})

const mapDispatchToProps = {
  toggleCreateChatWindowVisibility: uiActions.toggleCreateChatWindowVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChatWindow)
