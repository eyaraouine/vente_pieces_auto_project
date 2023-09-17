import ProviderProps from "./ProviderProps";
import CarProps from "./carProps";
import { CategoryProps } from "./categoryProps";

export interface ProductProps{
    id: string;
    piece: string; 
    image: string;
    price: number;
    description: string;
    constructorReference: string;
    comments: string; 
    provider: ProductProps ;
    cars: CarProps;
    category: CategoryProps;
    subCategory: CategoryProps;
}