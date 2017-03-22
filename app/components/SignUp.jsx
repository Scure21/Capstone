import React from 'react'
import axios from 'axios'


export default (props) => {


 return(
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <form className="form-horizontal" onSubmit={props.handleSubmit}>

           <div className="form-group">
              <label for="Name" className="col-sm-3 control-label">Name</label>
              <div className="col-sm-9">
                <input className="form-control" id="inputEmail3" placeholder="Name" onChange={props.handleNameChange} />
              </div>
            </div>

           <div className="form-group">
              <label for="inputEmail3" className="col-sm-3 control-label">Email</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="inputEmail3" placeholder="Email" onChange={props.handleEmailChange}/>
              </div>
            </div>

           <div className="form-group">
              <label for="inputPassword3" className="col-sm-3 control-label">Password</label>
              <div className="col-sm-9">
                <input type="password" className="form-control" id="inputPassword3" placeholder="Password" onChange={props.handlePasswordChange}/>
              </div>
            </div>

           <div className="form-group">
              <label for="inputPassword3" className="col-sm-3 control-label">Retype Password</label>
              <div className="col-sm-9">
                <input type="password" className="form-control" id="inputPassword3" placeholder="Password" onChange={props.handlePassword2Change}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-6">
                <button type="submit" className="btn btn-danger" >Sign Up!</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-6">

        <a href="/api/auth/login/github">
          <button type="submit" className="btn btn-danger">
              Sign in with Github
            </button>
          </a>
          <br />
          <a href="/api/auth/login/google">
            <button type="submit" className="btn btn-info">Sign in with Google</button>
          </a>
          <br />
          <a href="/api/auth/login/facebook">
            <button type="submit" className="btn btn-normal">Sign in with Facebook</button>
          </a>

       </div>
      </div>
    </div>
  )

}