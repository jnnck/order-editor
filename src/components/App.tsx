import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import * as CustomerActionCreators from '../redux/action-creators/CustomerActionCreators ';
import * as ProductActionCreators from '../redux/action-creators/ProductActionCreators';
import * as OrderActionCreators from '../redux/action-creators/OrderActionCreators';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from '../pages/Home';
import Detail from '../pages/Detail';

function App() {

  const dispatch = useDispatch();
  const { loadProducts } = bindActionCreators(ProductActionCreators, dispatch);
  const { loadCustomers } = bindActionCreators(CustomerActionCreators, dispatch);
  const { loadOrders } = bindActionCreators(OrderActionCreators, dispatch);

  useEffect(() => {
    loadProducts();
    loadCustomers();
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="uk-container">

        <Switch>
          <Route path="/orders/:id">
            <Detail />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/create">
            <Detail />
          </Route>
          <Route path="/">
            404
          </Route>
        </Switch>

      </div>
    </Router >

  );
}

export default App;
