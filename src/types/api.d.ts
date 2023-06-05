export interface IUrlParams {
    page: number,
    limit?: number,
    search?: SearchParams
}

export interface ISearchParams {
    [key : string]: string,
}