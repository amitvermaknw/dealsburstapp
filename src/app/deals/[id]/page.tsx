import { PDetails } from "@/features/pdetails";
import apiClient from "@/utils/AxiosInstance";
import { ProductListProps } from "@/utils/types/ProductList";
import { AxiosResponse } from "axios";

const DealsDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const response: AxiosResponse<ProductListProps> = await apiClient.get<ProductListProps>(`/api/deals/details/?pId=${id}`);
    return <PDetails {...response.data} />
}

export default DealsDetails;