/* ------- ACTIONS -------- */
const GET_USERS = 'GET_USERS'

/* -------------  ACTION CREATORS  --------------- */

export const getUsers = usersToInt => ({
  type: GET_USERS,
  usersToInt
})

const initialUsersState = {
   users: {}
}

/* --------------- REDUCER ----------------- */
export default function (state = initialUsersState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case GET_USERS:
      newState.users = action.usersToInt
      break

    default:
      return state
  }
  return newState
}
