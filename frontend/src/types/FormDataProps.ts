import ProviderProps from "./ProviderProps";

export interface FormDataProps {
  category: string;
  subCategory: string;
  piece: string;
  image?: File;
  price?: number;
  description?: string;
  constructorReference?: string;
  comments?: string;
  brand: string;
  model: string;
  motorization: string;
  carCode: string;
  provider: ProviderProps;
  pieceCode : string;
}
