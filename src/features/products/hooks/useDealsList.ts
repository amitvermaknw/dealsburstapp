import { useReducer } from "react";
import { ProductListProps } from "@/utils/interface/ProductList";
import CommonReducer from "./reducer/CommonReducer";
import { GET_DEALS } from "@/utils/Constants";
import { fetchProducts } from "@/services/productServices";


const useDealsList = (initState: Array<ProductListProps>) => {

    const [state, dispatch] = useReducer(CommonReducer, initState);

    const dealsList = async (callType: string, record: number) => {
        const result = await fetchProducts(callType, record);
        dispatch({ type: GET_DEALS, content: result });
    }

    return [state, dealsList] as const;
};

export default useDealsList;