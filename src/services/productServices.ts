// import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { ProductListProps } from '@/utils/interface/ProductList';
import apiClient from '@/utils/AxiosInstance';

const fetchProducts = async (callType: string, record: number): Promise<ProductListProps | []> => {
    try {
        const result: AxiosResponse<ProductListProps> = await apiClient.get<ProductListProps>(`/api/products/?callType=${callType}&record=${record}`);
        if (result.status === 200) {
            return result.data;
        } else {
            // toast.error(result.statusText);
            return [];
        }
    } catch (error) {
        if (error instanceof Error) {
            // toast.error(error.message);
            throw (error)
        }
        return []
    }
}

export {
    fetchProducts,
}