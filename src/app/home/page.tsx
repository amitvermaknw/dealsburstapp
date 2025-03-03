import { Banner, TodaysDeals } from "@/features/home";
import { SearchWidget } from "@/features/search";
import { fetchProducts } from "@/services/productServices";
import { ProductListProps } from "@/utils/types/ProductList";

const HomePage = async () => {
    const response = await fetchProducts('start', 5);
    const initialProducts: ProductListProps[] = Array.isArray(response) ? response : [response];
    return (
        <>
            <SearchWidget />
            <Banner />
            <TodaysDeals initialProducts={initialProducts} />
        </>

    )
}

export default HomePage;