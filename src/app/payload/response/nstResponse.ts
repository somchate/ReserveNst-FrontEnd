import { Nst } from "src/app/model/nst";

export interface NstResponse {
    content: Nst[],
    pageable: {
        offset: number;
        pageSize: number;
        pageNumber: number;
        page: boolean;
        unpage: boolean;
    },
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    previous: string;
    empty: boolean;
};