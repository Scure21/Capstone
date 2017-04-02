// CONSTANTS
const ADD_USER_TO_PROJECTOR = 'ADD_USER_TO_PROJECTOR'
const GET_USER_IN_MOBILE = 'GET_USER_IN_MOBILE'
let COLORS = ['blue', 'yellow', 'purple', 'green']

// ACTION CREATORS
export const createNewUser = (userName, userId) => {
    const userObj = {}
    userObj.id = userId
    userObj.name = userName
    userObj.color = COLORS.shift()
    return {type: ADD_USER_TO_PROJECTOR, userObj}
}

export const getUser = (user) => ({type: GET_USER_IN_MOBILE, user})


// REDUCER
const initialState = {
    list: [],
    current: {}
}

const users = (state = initialState, action) => {
    const newState = Object.assign({}, state)

    switch (action.type) {
        //for the phone
        case GET_USER_IN_MOBILE:
             newState.current = action.user
             return newState
            //for the projector
        case ADD_USER_TO_PROJECTOR:
            newState.list = newState.list.concat([action.userObj])
            return newState

        default:
            return state
    }
}

export default users
