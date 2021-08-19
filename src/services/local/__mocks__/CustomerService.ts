import CustomerMapper from "../../../redux/helpers/mappers/CustomerMapper";
import customers from "../../../../public/data/customers.json"

export const fetchCustomers = async () => {
    return  CustomerMapper(customers);
}