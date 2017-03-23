import React from 'react'
import MobileDetect from 'mobile-detect'
    var md = new MobileDetect(window.navigator.userAgent);
import Modal from 'react-modal'
import Login from './Login'
import SignUpContainer from './SignupContainer'

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 300,
    left              : 300,
    right             : 300,
    bottom            : 300,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '20px',
    left                       : '20px',
    right                      : '20px',
    bottom                     : '20px',
    border                     : '1px solid #ccc',
    background                 : 'grey',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'

  }
};


export default class ExampleApp extends React.Component{

   constructor(props){
    super(props)

    this.state = {
      modalIsOpen: false,
      loginOrSignup: ''
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal(e){
    this.setState({modalIsOpen: true})
    this.setState({loginOrSignup: e.target.name})
  }

  closeModal(){
    this.setState({modalIsOpen: false})
  }

  render(){
    return(
      <div>
        <button id="login-btn" name="login" onClick={this.openModal}> Login! </button>
        <button id="signup-btn" name="signup" onClick={this.openModal}> Sign up! </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="login Modal"
        >
        {
          this.state.loginOrSignup === 'signup' ? <SignUpContainer /> : <Login />
        }
        </Modal>
    </div>
  )
}

}