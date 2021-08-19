import { Customer } from "../../types/CustomerTypes";

type CustomerResponse = {
    id: string,
    name: string,
    since: string,
    revenue: string
}[]
    
const CustomerMapper = (apiResponse: CustomerResponse) => {
    const customers: Customer[] = apiResponse.map(customer => ({
        id: parseInt(customer.id),
        name: customer.name,
        since: customer.since,
        revenue: parseFloat(customer.revenue)
    }))

    return customers;
}

export default CustomerMapper