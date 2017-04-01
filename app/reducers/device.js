// CONSTANTS
const DEVICE_TYPE = 'DEVICE_TYPE'

// ACTION CREATORS
export const checkDeviceType = device => ({type: DEVICE_TYPE, device})

// REDUCER
const initialState = {
    device : ''
}

const device = (state = initialState, action) => {
    const newState = Object.assign({}, state)

    switch (action.type) {
    case DEVICE_TYPE:
        return newState.device = action.device

    default:
        return state
    }
}

export default device
