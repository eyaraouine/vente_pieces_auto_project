import PaginateDto from "../../generic/crud/dto/paginate.dto";

export default class SearchDto extends PaginateDto{
    brand: string;
    model: string;
    motorization: string;
    sortBy: string;
}