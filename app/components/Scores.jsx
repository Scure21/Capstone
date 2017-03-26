import React, { Component } from 'react'

export default (props) => {
  let scores = props.snakes.map((a,b) => {
    return b.points - a.points
  })
  return(
    <div id="leaderboard">
      <table>
        <tbody>
          <tr>
            <th> Name </th>
            <th> Score </th>
          </tr>
          {
            scores.map((snake, indx) => {
              return(
                <tr key={indx}>
                  <td>{`snake ${indx}`}</td>
                  <td>{snake.points}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )

}
