import ProductsList from "@/features/products/components/ProductsList";
import { fetchProducts } from "@/services/productServices";
import { ProductListProps } from "@/utils/types/ProductList";

const DealsPage = async () => {
    const response = await fetchProducts('start', 5);
    const initialProducts: ProductListProps[] = Array.isArray(response) ? response : [response];
    return <ProductsList initialProducts={initialProducts} />
}

export default DealsPage;