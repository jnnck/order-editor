import React from 'react';
import { Customer } from "../../redux/types/CustomerTypes";
import { Order } from '../../redux/types/OrderTypes';
import { Product } from '../../redux/types/ProductTypes';
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import classnames from "classnames";
import OrderFormValidator from './validators/OrderFormValidator';

interface OrderFormParams {
    order: Order | undefined;
    customers: Customer[];
    products: Product[];
    submit: SubmitHandler<OrderFormData>
};

export interface OrderFormData {
    customerId: number,
    items: Array<{
        productId: string,
        quantity: number
    }>
};

const OrderForm = (props: OrderFormParams) => {
    const { order, customers, products, submit } = props;
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<OrderFormData>({
        defaultValues: order,
        resolver: yupResolver(OrderFormValidator)
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const items = watch("items");
    const controlledFields = fields.map((field, index) => {
        return {
            ...field,
            ...items[index]
        };
    });

    const getPrice = (productId: string) => {
        const product = products.find(product => product.id === productId);
        return product?.price;
    }

    const getTotalPrice = (productId: string, quantity: number | undefined) => {
        const product = products.find(product => product.id === productId);
        return ((quantity ? quantity : 0) * (product?.price ? product?.price : 0)).toFixed(2);
    }

    const getOrderTotalPrice = () => {
        let total = 0;

        if (items) {
            items.forEach(item => {
                const product = products.find(product => product.id === item.productId);
                total += parseFloat(((item.quantity ? item.quantity : 0) * (product?.price ? product?.price : 0)).toFixed(2));
            })
        }

        return total;
    }

    const onSubmit = handleSubmit(submit);

    return (
        <form onSubmit={onSubmit} className="uk-grid-small uk-grid">

            <div className="uk-width-1-1 uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-select">Customer</label>
                <div className="uk-form-controls">
                    <select {...register(`customerId`)} className="uk-select" id="form-stacked-select">
                        {customers.map(customer => (
                            <option value={customer.id} key={customer.id}>{customer.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="uk-width-1-1">
                <h2>Products</h2>
            </div>

            {controlledFields.map((item, index) => (
                <React.Fragment key={item.id}>
                    <div className="uk-width-1-4@s uk-margin  uk-margin-top">
                        <label className="uk-form-label">Product</label>

                        <select
                            {...register(`items.${index}.productId`)}
                            className={classnames("uk-input", { "uk-form-danger": errors?.items?.[index]?.productId })}
                            defaultValue={item.productId}
                        >
                            {products.map(product => (
                                <option value={product.id} key={product.id}>{product.description}</option>
                            ))}
                        </select>
                        <div className="feedback" style={{ fontSize: 12, color: "#f0506e" }}>{errors?.items?.[index]?.productId?.message}</div>

                    </div>

                    <div className="uk-width-1-4@s uk-margin">
                        <label className="uk-form-label" htmlFor="form-stacked-text">Amount</label>
                        <input
                            className={classnames("uk-input", { "uk-form-danger": errors?.items?.[index]?.quantity })}
                            type="number"
                            {...register(`items.${index}.quantity`)}
                            defaultValue={item.quantity}
                        />
                        <div className="feedback" style={{ fontSize: 12, color: "#f0506e" }}>{errors?.items?.[index]?.quantity?.message}</div>
                    </div>
                    <div className="uk-width-1-6@s uk-margin">
                        <label className="uk-form-label" htmlFor="form-stacked-text">Price</label>
                        <input className="uk-input" type="text" value={"€" + getPrice(item.productId)} disabled />

                    </div>
                    <div className="uk-width-1-6@s uk-margin">
                        <label className="uk-form-label" htmlFor="form-stacked-text">Total</label>
                        <input className="uk-input" type="text" value={"€" + getTotalPrice(item.productId, item.quantity)} disabled />
                    </div>
                    <div className="uk-width-1-6@s uk-margin">
                        <button className="uk-button uk-button-danger uk-margin-top uk-width-1-1" type="button" onClick={() => remove(index)}>Delete</button>
                    </div>
                </React.Fragment>
            ))}

            <div className="uk-width-1-1">
                <button
                    type="button"
                    className="uk-button uk-button-default uk-margin-top uk-width-1-1"
                    onClick={() =>
                        append({
                            productId: undefined,
                            quantity: 0,
                        })
                    }
                >
                    Add Product
                </button>
            </div>

            <div className="uk-width-1-1 uk-margin">
                <h2>Total</h2>
            </div>
            <div className="uk-width-5-6@s uk-margin" style={{ textAlign: "right", lineHeight: "40px" }}>
                €{getOrderTotalPrice()}
            </div>
            <div className="uk-width-1-6@s uk-margin">
                <button className="uk-button uk-button-primary uk-width-1-1" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default OrderForm