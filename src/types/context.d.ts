export interface IState {
    users?: IUser[]
    totalUsers?: number
    currentPage?: number
}

export interface IWalletContext extends IState {
    setState: (state: IState) => void
    setCurrency: (currency: ICurrencies) => void
    currency: ICurrencies

}

export interface ICurrencies {
    base: string,
    to: string,
    value: number
}


export interface IWalletProvider {
    children: JSX.Element
}