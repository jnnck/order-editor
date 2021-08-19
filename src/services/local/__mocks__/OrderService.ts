import { OrderMapper, OrdersMapper } from "../../../redux/helpers/mappers/OrderMapper";
import { Order } from "../../../redux/types/OrderTypes";
import orders from "../../../../public/data/orders.json";
import order from "../../../../public/data/orders/1.json";

export const fetchOrders = async () => {
    return OrdersMapper(orders);
}

export const fetchOrder = async (id: string | number) => {
    return OrderMapper(order);
}

export const storeOrder = async (order: Order) => {
    if(order.id){
        console.log("UPDATE ORDER: " + order.id)
    } else {
        delete order.id;
        console.log("CREATE ORDER")
    }
    console.log(order)
}