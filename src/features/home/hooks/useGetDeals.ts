import { useReducer } from "react";
import { ProductListProps } from "@/utils/types/ProductList";
import CommonReducer from "@/hooks/reducer/CommonReducer";
import { fetchProducts } from "@/services/productServices";
import { GET_DEALS } from "@/utils/Constants";

const useGetDeals = (initState: Array<ProductListProps>) => {

    const [pstate, dispatch] = useReducer(CommonReducer, initState)

    const fetchDeals = async (callType: string, record: number) => {
        const result = await fetchProducts(callType, record);
        dispatch({ type: GET_DEALS, content: result })
        localStorage.setItem('deals_cache', JSON.stringify(pstate));
    }


    return [pstate, fetchDeals] as const;
};

export default useGetDeals;