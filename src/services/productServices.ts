import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';
import { ProductListProps } from '@/utils/interface/ProductList';


const fetchProducts = async (callType: string, record: number) => {
    try {
        const result: AxiosResponse<ProductListProps> = await axios.get<ProductListProps>(`/deals?callType=${callType}&record=${record}`);
        if (result.status === 200) {
            return result.data;
        } else {
            toast.error(result.statusText);
            return [];
        }
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
            throw (error)
        }
        return []
    }
}

export {
    fetchProducts,
}