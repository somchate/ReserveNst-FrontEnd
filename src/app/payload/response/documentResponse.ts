import { Document } from "src/app/model/document";

export interface DocumentResponse {
    content: Document[],
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