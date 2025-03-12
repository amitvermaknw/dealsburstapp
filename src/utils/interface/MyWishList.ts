import { ProductListProps } from "../types/ProductList";
import { DealsReview } from "./DealReview";


export type MyWishList = ProductListProps & { dealsReview: DealsReview }