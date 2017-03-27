import React, { Component } from 'react'

export default class Scores extends Component {
  constructor(props){
    super(props)
  }

  render(){
    var snakesIds = this.props.snakes.list && Object.keys(this.props.snakes.list);

    return (
      <div id="leaderboard">
        <table>
           <tbody>
          <tr>
            <th> Name </th>
            <th> Score </th>
          </tr>
          {
            snakesIds && snakesIds.map((snakeId, indx) => {
              return (
                <tr key={indx}>
                  <td>{`User ${indx}`}</td>
                  <td id="score">{this.props.snakes.list[snakeId].points}</td>
                </tr>
              )
            })
          }
           </tbody>
        </table>
      </div>
    )
  }
}
