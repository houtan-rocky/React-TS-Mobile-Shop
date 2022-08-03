import React from "react";

interface IUserState {
    loading: boolean;
    error: string | null;
    data: string[];
}

interface IAction {
    type: string;
    payload?: any;
}

const reducer = (state: IUserState, action: IAction): IUserState => {
    switch (action.type) {
        case 'search_repositories':
            return {loading: true, error: null, data: []};
        case 'search_repositories_success':
            return {loading: false, error: null, data: action.payload};
        case 'search_repositories_error':
            return {loading: false, error: action.payload, data: []};
        default:
            return state;
    }
};
export default reducer;