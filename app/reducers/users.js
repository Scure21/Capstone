// CONSTANTS
const NEW_USER = "NEW_USER";


// ACTION CREATORS
const createNewUser = users => ({type: NEW_USER, users});

// REDUCER
const initialState = {
	users : {}
};

const users = (state = initialState, action) => {
	const newState = Object.assing({}, initialState);

	switch (action.type) {
	case NEW_USER:
		return newState.users = action.users;

	default:
		return state;
	}
};

export default users
