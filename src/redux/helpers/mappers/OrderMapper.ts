import { Order } from "../../types/OrderTypes";

type OrderResponse = {
    'id': string,
    'customer-id': string,
    'items': {
        'product-id': string,
        'quantity': string,
        'unit-price': string,
        'total': string
    }[],
    'total': string
}

export const OrdersMapper = (apiResponse: OrderResponse[]) => {
    const newOrders: Order[] = apiResponse.map(order => OrderMapper(order))
    return newOrders;
}

export const OrderMapper = (order: OrderResponse) => {
    return {
        id: parseInt(order.id),
        customerId: parseInt(order["customer-id"]),
        items: order.items.map(item => ({
            productId: item["product-id"],
            quantity: parseInt(item.quantity),
            unitPrice: parseFloat(item["unit-price"]),
            total: parseFloat(item.total)
        })),
        total: parseFloat(order.total)
    }
}