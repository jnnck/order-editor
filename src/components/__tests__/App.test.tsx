import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import Home from '../../pages/Home';

jest.mock('../../services/local/CustomerService');
jest.mock("../../services/local/ProductService");
jest.mock("../../services/local/OrderService");

describe('<App />', () => {
  it('renders the home page', () => {
    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>
    );
    
    expect(wrapper.find(Home).length).toEqual(1);
  });
});