import React, { Component } from 'react'

export default (props) => {
  console.log('inside scores.jsx: ', props)
  return (
    <div id="leaderboard">
      <table>
         <tbody>
        <tr>
          <th> Name </th>
          <th> Score </th>
        </tr>
        {
          props.snakes.map((snake, indx) => {
            return (
              <tr key={indx}>
                <td>{`User ${indx}`}</td>
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
