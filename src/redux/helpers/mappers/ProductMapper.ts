import { Product } from "../../types/ProductTypes";

type ProductResponse = {
    id: string,
    description: string,
    category: string,
    price: string
}[]
    
const ProductMapper = (apiResponse: ProductResponse) => {
    const products: Product[] = apiResponse.map(product => ({
        id: product.id,
        description: product.description,
        category: product.category,
        price: parseFloat(product.price)
    }))

    return products;
}

export default ProductMapper