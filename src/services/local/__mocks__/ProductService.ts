import ProductMapper from "../../../redux/helpers/mappers/ProductMapper";
import products from "../../../../public/data/products.json";

export const fetchProducts = async () => {
    return ProductMapper(products);
}