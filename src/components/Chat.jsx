import { connect } from 'react-redux'
import ChatHeader from './ChatHeader'
import SendMessageForm from './SendMessageForm'


const Chat = (props) => {
  return (
    <div className="chat">
      <ChatHeader />

      <div className="chat__body">
        
      </div>

      <SendMessageForm />
    </div>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
