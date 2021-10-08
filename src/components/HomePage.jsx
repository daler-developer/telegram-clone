import { connect } from 'react-redux'
import Chat from './Chat'
import SideBar from './SideBar'


const HomePage = (props) => {
  return (
    <div className={'home-page'}>
      <div className={'home-page__body'}>
        <SideBar />
        <Chat />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
