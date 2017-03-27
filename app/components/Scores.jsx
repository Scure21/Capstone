import React, { Component } from 'react'

export default (props) => {

  let scores = props.snakes.sort((a,b) => {
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
