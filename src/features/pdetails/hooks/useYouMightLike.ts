import { useReducer } from "react";
import CommonReducer from '@/hooks/reducer/CommonReducer';
import { ProductListProps } from "@/utils/types/ProductList";
import { fetchYouMightLikeDeals } from "@/services/productServices";
import { GET_DEALS } from "@/utils/Constants";

const useYouMightLike = (initState: Array<ProductListProps>) => {

    const [pstate, dispatch] = useReducer(CommonReducer, initState)

    const getYouMightLike = async (callType: string) => {
        const result = await fetchYouMightLikeDeals(callType);
        dispatch({ type: GET_DEALS, content: result })
        localStorage.setItem('deals_cache', JSON.stringify(pstate));
    }

    return [pstate, getYouMightLike] as const;
};

export default useYouMightLike;