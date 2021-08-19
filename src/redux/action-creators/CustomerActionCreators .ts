import { Dispatch } from "redux";
import { Action } from "../types/CustomerTypes";
import { CustomerActionTypes } from "../action-types/CustomerActionTypes";
import { fetchCustomers } from "../../services/local/CustomerService";

export const loadCustomers = () => async(dispatch: Dispatch<Action>) => {
    try {
        dispatch({
            type: CustomerActionTypes.SETLOADING
        });

        const customers = await fetchCustomers();

        dispatch({
            type: CustomerActionTypes.SETDONE
        });

        dispatch({
            type: CustomerActionTypes.FETCH,
            payload: customers
        });
    } catch(e) {
        dispatch({
            type: CustomerActionTypes.SETERROR,
        });
    }
}