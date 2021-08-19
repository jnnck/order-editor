import { OrderActionTypes } from "../action-types/OrderActionTypes";
import { Action, Order } from "../types/OrderTypes";

type State = {
    isLoading: boolean,
    hasError: boolean
    orders: Array<Order>
}

const initialState: State = {
    isLoading: false,
    hasError: false,
    orders: []
};

const OrderReducer = (state:State = initialState, action: Action) => {
    const newState = {...state};
    switch(action.type){
        case OrderActionTypes.CREATE:
            const order = action.payload;
            order.id = state.orders.length + 1;
           newState.orders.push(order);
            return newState;
        case OrderActionTypes.UPDATE:
            const index = state.orders.findIndex(order => order.id === action.payload.id);
            newState.orders[index] = action.payload;
            return newState;
        case OrderActionTypes.FETCH:
            newState.orders = action.payload
            return newState;
        case OrderActionTypes.SETLOADING:
            newState.isLoading = true;
            return newState;
        case OrderActionTypes.SETERROR:
            newState.hasError = true;
            return newState;
        case OrderActionTypes.SETDONE:
            newState.isLoading = false;
            newState.hasError = false;
            return newState;
        default:
            return state;
    }
}

export default OrderReducer