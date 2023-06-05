export interface IState {
    users?: IUser[]
    totalUsers?: number
    currentPage?: number
}

export interface IWalletContext extends IState {
setState: (state:IState) => void
}


export interface IWalletProvider {
children: JSX.Element
}