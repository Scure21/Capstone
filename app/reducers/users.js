// CONSTANTS
const ADD_USER_TO_PROJECTOR = 'ADD_USER_TO_PROJECTOR'
let COLORS = ['blue', 'yellow', 'purple', 'green']

// ACTION CREATORS
export const createNewUser = (userName, userId) => {
    const user = {}
    user.id = userId
    user.name = userName
    user.color = COLORS.shift()

    return {type: ADD_USER_TO_PROJECTOR, user}
}


// REDUCER
const initialState = {
    users: [],
    //user: ''
}

const users = (state = initialState, action) => {
    const newState = Object.assign({}, state)

    switch (action.type) {
        //for the phone
        // case NEW_USER_PHONE:
        //     return newState.user = action.userName
        //for the projector
        case ADD_USER_TO_PROJECTOR:
            console.log('USERS', newState.users)
         newState.users = newState.users.concat([action.user])
         return newState

        default:
            return state
    }
}

export default users
