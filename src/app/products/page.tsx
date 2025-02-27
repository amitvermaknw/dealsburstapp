import ProductsList from "@/features/products/components/ProductsList";
import { fetchProducts } from "@/services/productServices";
import { ProductListProps } from "@/utils/interface/ProductList";

const ProductsPage = async () => {
    const response = await fetchProducts('start', 20);
    const initialProducts: ProductListProps[] = Array.isArray(response) ? response : [response];
    return <ProductsList {...initialProducts} />
}

export default ProductsPage;