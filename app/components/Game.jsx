import React, {Component} from 'react';
import P5Wrapper from 'react-p5-wrapper'
import sketch from './sketch'

export default class Game extends Component{

  render(){
    return (

       <P5Wrapper sketch={sketch} />

      )
  }
}
