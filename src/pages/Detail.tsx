import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from 'react-router-dom';
import OrderForm, {OrderFormData} from '../components/forms/OrderForm';
import { State } from '../redux/reducers';
import { Order } from '../redux/types/OrderTypes';
import { storeOrder, fetchOrder } from '../services/local/OrderService';
import * as OrderActionCreators from '../redux/action-creators/OrderActionCreators';
import { bindActionCreators } from 'redux';

interface DetailParams {
    id: string;
};

const Detail = () => {
    const [order, setOrder] = useState<Order | undefined>();
    const { products } = useSelector((state: State) => state.products);
    const { customers } = useSelector((state: State) => state.customers);
    const { id } = useParams<DetailParams>();
    const dispatch = useDispatch();
    const history = useHistory();
    const { updateOrder, createOrder } = bindActionCreators(OrderActionCreators, dispatch);

    useEffect(()=> {
        if(id){
            fetchOrder(id).then(order => setOrder(order));
        }
    }, [id]);

    const getPrice = (productId: string) => {
        const product = products.find(product => product.id === productId);
        return product ? product.price: 0;
    }

    const handleSubmit = (data: OrderFormData) => {
        const order: Order = {
            id: (id ? parseInt(id) : undefined),
            customerId: data.customerId,
            items: [],
            total: 0
        }

        data.items.forEach(item => {
            const unitPrice = getPrice(item.productId);
            const total = parseFloat((unitPrice * item.quantity).toFixed(2))
            order.items.push({
                productId: item.productId,
                quantity: item.quantity,
                unitPrice,
                total
            })

            order.total += total
        })

        if(id){
            //UPDATE
            storeOrder(order).then(() => {
                updateOrder(order);
                history.push("/?updated");
            });
        } else {
            // CREATE
            storeOrder(order).then(() => {
                createOrder(order);
                history.push("/?created");
            });

        }
    }

    if(products.length > 0 && customers.length > 0 && (!!order || !id)){
        return (
                <div>
                    <h1>Order Detail</h1>
                    <ul className="uk-breadcrumb">
                        <li><Link to="/">Home</Link></li>
                        <li><span>Order 1</span></li>
                    </ul>

                    <OrderForm customers={customers} order={order} products={products} submit={handleSubmit}/>
                    
                </div>
            );
    } else {
        return <div uk-spinner="true" />
    }

    
}

export default Detail;
