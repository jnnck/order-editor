import axios from "axios";
import ProductMapper from "../../redux/helpers/mappers/ProductMapper";

export const fetchProducts = async () => {
    const response = await axios.get('/data/products.json');
    const products = ProductMapper(response.data)
    return products;
}