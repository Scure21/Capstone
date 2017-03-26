import React, { Component } from 'react'

export default (props) => {
  console.log("~~~~~~", props.snakes)
  return(
    <div id="leaderboard">
      <table>
        <tr>
          <th> Name </th>
          <th> Score </th>
        </tr>
        {
          props.snakes.map((snake, indx) => {
            return(
              <tr>
                <td>{`snake ${indx}`}</td>
                <td>{snake.points}</td>
              </tr>
            )
          })
        }
      </table>
    </div>
  )

}
