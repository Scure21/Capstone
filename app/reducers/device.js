// CONSTANTS
const DEVICE_TYPE = 'DEVICE_TYPE'

// ACTION CREATORS
const deviceType = device => ({type: DEVICE_TYPE, device})

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

// DISPATCH
export const checkDeviceType = (device) => dispatch => {
    function detectDevice () {
        if (device.match(/Android/i) ||
        device.match(/webOS/i) ||
        device.match(/iPhone/i) ||
        device.match(/iPad/i) ||
        device.match(/iPod/i) ||
        device.match(/BlackBerry/i) ||
        device.match(/Windows Phone/i)
        ){
            return 'mobile'
        } else {
            return 'projector'
        }
    }
    dispatch(deviceType(detectDevice(device)))
}
export default device
