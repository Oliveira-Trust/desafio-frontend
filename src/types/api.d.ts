import { IUrlParams } from './api.d';
export interface IUrlParams {
    page: number,
    limit?: number,
    search?: SearchParams
}

export interface ISearchParams {
    [key : string]: string,
}

export interface IUrlParamsCurrency {
    currencies: string[]
}