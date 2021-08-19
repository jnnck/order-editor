import React from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { State } from '../redux/reducers';

const Home = () => {
  const { orders } = useSelector((state: State) => state.orders);
  const { customers } = useSelector((state: State) => state.customers);

  //todo use this instead of find
  //const easyCustomers: {} = customers.reduce((obj, item) => Object.assign(obj, { [item.id]: item.name }), {});

  return (
    <div>
      <h1>Home</h1>
      {window.location.search.indexOf("updated") > -1 && (
        <div className="uk-alert uk-alert-success" uk-alert="true">
          <p>Order has been updated.</p>
        </div>
      )}

      {window.location.search.indexOf("created") > -1 && (
        <div className="uk-alert uk-alert-success" uk-alert="true">
          <p>Order has been created.</p>
        </div>
      )}
 
        {orders && customers ? (
          <table className="uk-table uk-table-divider">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{customers.find(customer => customer.id === order.customerId)?.name}</td>
                  <td>€{order.total}</td>
                  <td style={{textAlign: "right"}}><Link to={'/orders/' + order.id} className="uk-button uk-button-primary">Edit</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div uk-spinner="true" />
        )}

        <Link to="/create" data-testid="create_order" className="uk-button uk-button-primary">Create Order</Link>
    </div>

  )
};

export default Home;