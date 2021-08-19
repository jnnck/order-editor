import { ProductActionTypes } from "../action-types/ProductActionTypes";

export type Product = {
    id: string,
    description: string,
    category: string,
    price: number
}

interface FetchInterface {
    type: ProductActionTypes.FETCH,
    payload: Array<Product>
}

interface SetDoneInterface {
    type: ProductActionTypes.SETDONE
}

interface SetLoadingInterface {
    type: ProductActionTypes.SETLOADING
}

interface SetErrorInterface {
    type: ProductActionTypes.SETERROR
}

export type Action = FetchInterface | SetDoneInterface | SetLoadingInterface | SetErrorInterface; 