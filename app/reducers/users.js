// CONSTANTS
const NEW_USER = 'NEW_USER'

// ACTION CREATORS
const NewUser = userName => ({type: NEW_USER, userName})

// REDUCER
const initialState = {
    users: ''
}

const users = (state = initialState, action) => {
    const newState = Object.assign({}, state)

    switch (action.type) {
    case NEW_USER:
        return newState.users = action.userName

    default:
        return state
    }
}

// DISPATCH
export const createNewUser = (userName) => dispatch => {
    dispatch(NewUser(userName))
}

// var colorKey = 0
// var colors = ['blue', 'yellow', 'purple', 'green']
// users.map(function(user){
//     user.colorName = colors[colorKey]
//     if (colorKey > 2){
//         colorKey %= 2
//     }
//     else{
//         colorKey += 1
//     }
// })

export default users
