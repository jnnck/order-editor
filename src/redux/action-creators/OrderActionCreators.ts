import { OrderActionTypes } from "../action-types/OrderActionTypes";
import { Dispatch } from "redux";
import { Action, Order } from "../types/OrderTypes";
import { fetchOrders } from "../../services/local/OrderService";

export const loadOrders = () => async(dispatch: Dispatch<Action>) => {
    try {
        dispatch({
            type: OrderActionTypes.SETLOADING
        });

        const orders = await fetchOrders();

        dispatch({
            type: OrderActionTypes.SETDONE
        });

        dispatch({
            type: OrderActionTypes.FETCH,
            payload: orders
        });
    } catch(e) {
        dispatch({
            type: OrderActionTypes.SETERROR,
        });
    }
}

export const updateOrder = (order: Order) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: OrderActionTypes.UPDATE,
            payload: order
        })
    }
}

export const createOrder = (order: Order) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: OrderActionTypes.CREATE,
            payload: order
        })
    }
}