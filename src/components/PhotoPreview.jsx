import { connect } from 'react-redux'
import pt from 'prop-types'


const PhotoPreview = (props) => {
  return (
    <div className={`photo-preview ${props.isHidden && 'photo-preview--hidden'}`}>
      <img src={props.photoURL} className="photo-preview__photo" />
      <button className="photo-preview__remove-photo-btn" onClick={props.onDeletePhotoBtnClick} type="button">
        Remove
      </button>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

PhotoPreview.propTypes = {
  photoURL: pt.string,
  isHidden: pt.bool.isRequired,
  onDeletePhotoBtnClick: pt.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPreview)
