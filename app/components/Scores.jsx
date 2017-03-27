// import React, { Component } from 'react'

// export default (props) => {
//   console.log("~~~~~~~~~~~~~~", props.snakes.list)
//   let scores = props.snakes.list.sort((a,b) => {
//     return b.points - a.points
//   })
//   console.log("SCORES: ", scores)
//   return(
//     <div id="leaderboard">
//       <table>
//         <tbody>
//           <tr>
//             <th> Name </th>
//             <th> Score </th>
//           </tr>
//           {
//             scores.map((snake, indx) => {
//               console.log('inside scores.map', snake)
//               return(
//                 <tr key={indx}>
//                   <td>{`snake ${indx}`}</td>
//                   <td>{snake.points}</td>
//                 </tr>
//               )
//             })
//           }
//         </tbody>
//       </table>
//     </div>
//   )
// }


import React, { Component } from 'react'

export default class Scores extends Component {
  constructor(props){
    super(props)
  }

  render(){
    console.log("***** INSIDE SCORES: ", this.props.snakes.list)
    var snakesIds = this.props.snakes.list && Object.keys(this.props.snakes.list);
    console.log('**** SNAKESIDS :', snakesIds)

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
                  <td>{this.props.snakes.list[snakeId].points}</td>
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
