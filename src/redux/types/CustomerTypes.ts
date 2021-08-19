import { CustomerActionTypes } from "../action-types/CustomerActionTypes";

/* {
    "id": "1",
    "name": "Coca Cola",
    "since": "2014-06-28",
    "revenue": "492.12"
} */

export type Customer = {
    id: number,
    name: string,
    since: string,
    revenue: number
}

interface FetchInterface {
    type: CustomerActionTypes.FETCH,
    payload: Array<Customer>
}

interface SetDoneInterface {
    type: CustomerActionTypes.SETDONE
}

interface SetLoadingInterface {
    type: CustomerActionTypes.SETLOADING
}

interface SetErrorInterface {
    type: CustomerActionTypes.SETERROR
}

export type Action = FetchInterface | SetDoneInterface | SetLoadingInterface | SetErrorInterface;