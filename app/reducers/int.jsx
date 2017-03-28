/* ------- ACTIONS -------- */
const GET_USERS = 'GET_USERS'

/* -------------  ACTION CREATORS  --------------- */

export const getUsers = users => ({
  type: GET_USERS,
  users
})

const initialUsersState = {
   users: []
}

/* --------------- REDUCER ----------------- */
export default function (state = initialUsersState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case GET_USERS:
      newState.users = action.users
      break

    default:
      return state
  }
  return newState
}
