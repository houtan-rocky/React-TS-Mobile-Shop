import { DARK_MODE } from "../types";

// initial state
const initialState = {
    // checking mode from localstorage if falsey (e.g. 0, null, undefined, etc.) it will be false, otherwise true
    isdarkMode: !!JSON.parse(localStorage.getItem("darkmode") || '{"a":"b"}' ) || false,
};

const darkModeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case DARK_MODE:
            return {
                ...state,
                // getting value from the action file and changing isdarkMode State.
                isdarkMode: action.payload,
            };
        default:
            return state;
    }
};

export default darkModeReducer;