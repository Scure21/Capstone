import React, { Component } from 'react'
import { browserHistory } from 'react-router'

const Home = () => (
  <div>
    <div id="welcome-page">
      <div id="logo">
        <img src="images/sketch_images/logo.png" className="img-responsive" id="logoName"/>
        <img src="images/sketch_images/banner.png" className="img-responsive" id="banner"/>
        <button id="play" onClick={() => browserHistory.push('/waitingroom')}></button>
      </div>
      <footer> made with <span><img className="love" src="images/sketch_images/8-bit-heart.png" /></span> at GHA </footer>
    </div>
  </div>
)

export default Home

