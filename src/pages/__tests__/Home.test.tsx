import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Home from '../Home';
import App from '../../components/App';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import { Link, MemoryRouter } from 'react-router-dom';
import { OrderActionTypes } from '../../redux/action-types/OrderActionTypes';
import CustomerMapper from '../../redux/helpers/mappers/CustomerMapper';
import { OrdersMapper } from '../../redux/helpers/mappers/OrderMapper';
import orders from "../../../public/data/orders.json";
import products from "../../../public/data/products.json";
import customers from "../../../public/data/customers.json";
import { ProductActionTypes } from '../../redux/action-types/ProductActionTypes';
import { CustomerActionTypes } from '../../redux/action-types/CustomerActionTypes';
import ProductMapper from '../../redux/helpers/mappers/ProductMapper';

jest.mock('../../services/local/CustomerService');
jest.mock("../../services/local/ProductService");
jest.mock("../../services/local/OrderService");

let wrapper: ReactWrapper;
beforeEach(() => {
  wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );

  // Fill store with mock data
  store.dispatch({type: OrderActionTypes.FETCH, payload: OrdersMapper(orders)});
  store.dispatch({type: ProductActionTypes.FETCH, payload: ProductMapper(products)});
  store.dispatch({type: CustomerActionTypes.FETCH, payload: CustomerMapper(customers)});
})

afterEach(()=> {
  wrapper.unmount();
})

describe('<Home />', () => {
  it('renders a table', () => {
    expect(wrapper.find("table").length).toEqual(1);
  });

  it('shows 3 orders', (done) => {
    setTimeout(()=>{
      wrapper.update();
      expect(wrapper.find("tbody tr").length).toEqual(3);
      done();
    })
  });

  it('has edit buttons', (done) => {
    setTimeout(()=>{
      wrapper.update();
      expect(wrapper.find("tbody").find(Link).length).toEqual(3);
      done();
    })
  });

  it('has a create button', (done) => {
    setTimeout(()=>{
      wrapper.update();
      expect(wrapper.find('[data-testid="create_order"]').length).toEqual(3);
      done();
    })
  });
});