import axios from "axios";
import CustomerMapper from "../../redux/helpers/mappers/CustomerMapper";

export const fetchCustomers = async () => {
    const response = await axios.get('/data/customers.json');
    const customers = CustomerMapper(response.data)
    return customers;
}