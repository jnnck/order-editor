import { OrderActionTypes } from "../action-types/OrderActionTypes";

/* 
{
    "id": "1",
    "customer-id": "1",
    "items": [
        {
            "product-id": "B102",
            "quantity": "10",
            "unit-price": "4.99",
            "total": "49.90"
        }
    ],
    "total": "49.90"
    } 
*/

export type Order = {
    id: number | undefined,
    customerId: number,
    items: Array<{
        productId: string,
        quantity: number,
        unitPrice: number,
        total: number
    }>
    total: number
}

interface CreateInterface {
    type: OrderActionTypes.CREATE,
    payload: Order
}

interface UpdateInterface {
    type: OrderActionTypes.UPDATE,
    payload: Order
}

interface FetchInterface {
    type: OrderActionTypes.FETCH,
    payload: Array<Order>
}

interface SetDoneInterface {
    type: OrderActionTypes.SETDONE
}

interface SetLoadingInterface {
    type: OrderActionTypes.SETLOADING
}

interface SetErrorInterface {
    type: OrderActionTypes.SETERROR
}

export type Action = CreateInterface | UpdateInterface | FetchInterface | SetDoneInterface | SetLoadingInterface | SetErrorInterface; 