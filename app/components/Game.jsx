import React, {Component} from 'react'
import P5Wrapper from 'react-p5-wrapper'
import sketch from '../game_scripts/sketch'
import ScoresContainer from '../containers/ScoresContainer'

export default class Game extends Component {
  render () {
    return (

      <div>
        <ScoresContainer />
        <P5Wrapper id="game" sketch={sketch} />
      </div>
    )
  }
}
