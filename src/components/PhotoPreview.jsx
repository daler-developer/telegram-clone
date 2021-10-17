import { connect } from 'react-redux'
import pt from 'prop-types'


const PhotoPreview = (props) => {
  return (
    <div className={`photo-preview ${props.isHidden && 'photo-preview--hidden'}`}>
      <img src={props.photoURL} className="photo-preview__photo" />
      <button className="photo-preview__remove-photo-btn" onClick={props.onDeletePhoto}>
        Remove
      </button>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

PhotoPreview.propTypes = {
  photoURL: pt.string.isRequired,
  isHidden: pt.bool.isRequired,
  onDeletePhoto: pt.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPreview)
