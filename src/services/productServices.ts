import { AxiosResponse } from 'axios';
import { ProductListProps } from '@/utils/types/ProductList';
import apiClient from '@/utils/AxiosInstance';

const fetchProducts = async (callType: string, record: number): Promise<ProductListProps | []> => {
    try {
        const result: AxiosResponse<ProductListProps> = await apiClient.get<ProductListProps>(`/api/products/?callType=${callType}&record=${record}`);
        if (result.status === 200) {
            return result.data;
        } else {
            return [];
        }
    } catch (error) {
        if (error instanceof Error) {
            throw (error)
        }
        return []
    }
}

const fetchProductDetails = async (pId: string | undefined): Promise<ProductListProps | null> => {
    try {
        const result: AxiosResponse<ProductListProps> = await apiClient.get<ProductListProps>(`/api/deals/${pId}`);
        if (result.status === 200) {
            return result.data;
        } else {
            return null;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw (error)
        }
        return null
    }
}

export {
    fetchProducts,
    fetchProductDetails
}