import { PDetails } from "@/features/pdetails";
import apiClient from "@/utils/AxiosInstance";
import { ProductListProps } from "@/utils/types/ProductList";
import { AxiosResponse } from "axios";

const DealsDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const response: AxiosResponse<ProductListProps> = await apiClient.get<ProductListProps>(`/api/deals/details/?pId=${id}`);
    const dealsData: ProductListProps = response.data[0] as ProductListProps;
    return <PDetails {...dealsData} />
}

export default DealsDetails;