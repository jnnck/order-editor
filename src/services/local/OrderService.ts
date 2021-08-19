import axios from "axios";
import { OrderMapper, OrdersMapper } from "../../redux/helpers/mappers/OrderMapper";
import { Order } from "../../redux/types/OrderTypes";

export const fetchOrders = async () => {
    const response = await axios.get('/data/orders.json');
    const orders = OrdersMapper(response.data)
    return orders;
}

export const fetchOrder = async (id: string | number) => {
    const response = await axios.get('/data/orders/'+ id +'.json');
    const orders = OrderMapper(response.data)
    return orders;
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