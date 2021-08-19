import orderReducer from "./OrderReducer";
import {combineReducers} from "redux";
import ProductReducer from "./ProductsReducer";
import CustomerReducer from "./CustomersReducer";

const rootReducer = combineReducers({
    orders: orderReducer,
    products: ProductReducer,
    customers: CustomerReducer
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;