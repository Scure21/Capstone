// CONSTANTS
const ADD_USER_TO_PROJECTOR = 'ADD_USER_TO_PROJECTOR'
let COLORS = ['blue', 'yellow', 'purple', 'green']

// ACTION CREATORS
const createNewUser = (socketId, userName) => {
    const user = {}
    user.id = socketId
    user.name = userName
    user.color = COLORS.pop()

    return {type: ADD_USER_TO_PROJECTOR, user}
}


// REDUCER
const initialState = {
    users: [],
    user: ''
}

const users = (state = initialState, action) => {
    const newState = Object.assign({}, state)

    switch (action.type) {
        //for the phone
        // case NEW_USER_PHONE:
        //     return newState.user = action.userName
        //for the projector
        case ADD_USER_TO_PROJECTOR:
            return newState.users.concat(action.user)

        default:
            return state
    }
}

export default users
