import { Dispatch } from "redux";
import { Action } from "../types/ProductTypes";
import { ProductActionTypes } from "../action-types/ProductActionTypes";
import { fetchProducts } from "../../services/local/ProductService";

export const loadProducts = () => async(dispatch: Dispatch<Action>) => {
    try {
        dispatch({
            type: ProductActionTypes.SETLOADING
        });

        const products = await fetchProducts();

        dispatch({
            type: ProductActionTypes.SETDONE
        });

        dispatch({
            type: ProductActionTypes.FETCH,
            payload: products
        });
    } catch(e) {
        dispatch({
            type: ProductActionTypes.SETERROR,
        });
    }
}