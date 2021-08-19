import { ProductActionTypes } from "../action-types/ProductActionTypes";
import { Product, Action } from "../types/ProductTypes";

type State = {
    isLoading: boolean,
    hasError: boolean
    products: Array<Product>
}

const initialState: State = {
    isLoading: false,
    hasError: false,
    products: []
};

const ProductReducer = (state: State = initialState, action: Action) => {
    const newState = { ...state };
    switch (action.type) {
        case ProductActionTypes.FETCH:
            newState.products = action.payload
            return newState;
        case ProductActionTypes.SETLOADING:
            newState.isLoading = true;
            return newState;
        case ProductActionTypes.SETERROR:
            newState.hasError = true;
            return newState;
        case ProductActionTypes.SETDONE:
            newState.isLoading = false;
            newState.hasError = false;
            return newState;
        default:
            return state;
    }
}

export default ProductReducer