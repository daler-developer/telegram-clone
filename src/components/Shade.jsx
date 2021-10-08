import pt from 'prop-types'

const Shade = (props) => {
  return (
    <div
      className={`shade ${!props.visibility && 'shade--hidden'}`}
      onClick={props.onClick}
    />
  )
}

Shade.propTypes = {
  visibility: pt.bool,
  onClick: pt.func
}

export default Shade
