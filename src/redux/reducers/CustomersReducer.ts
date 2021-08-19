import { CustomerActionTypes } from "../action-types/CustomerActionTypes";
import { Customer, Action } from "../types/CustomerTypes";

type State = {
    isLoading: boolean,
    hasError: boolean
    customers: Array<Customer>
}

const initialState: State = {
    isLoading: false,
    hasError: false,
    customers: []
};

const CustomerReducer = (state: State = initialState, action: Action) => {
    const newState = { ...state };
    switch (action.type) {
        case CustomerActionTypes.FETCH:
            newState.customers = action.payload
            return newState;
        case CustomerActionTypes.SETLOADING:
            newState.isLoading = true;
            return newState;
        case CustomerActionTypes.SETERROR:
            newState.hasError = true;
            return newState;
        case CustomerActionTypes.SETDONE:
            newState.isLoading = false;
            newState.hasError = false;
            return newState;
        default:
            return state;
    }
}

export default CustomerReducer