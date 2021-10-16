import logo from 'assets/logo.svg'


const Intro = () => {

  return (
    <div className={'intro'}>
      <img src={logo} className={'intro__logo'} />
      <h1 className={'intro__title h4'}>
        Welcome to Whatsapp Clone
      </h1>
    </div>
  )
}

export default Intro
