export interface UrlParams {
    page: number,
    limit?: number,
    search?: SearchParams
}

export interface SearchParams {
    [key : string]: string,
}