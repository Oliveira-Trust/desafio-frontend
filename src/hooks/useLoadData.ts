import { ISearchParams, IUrlParams } from '../types/api'
import { useWalletContext } from '../context/WalletProvider'
import { list, listAll } from '../apis/user'
import { UserApiErrors, ensureError } from '../utils/utils'

interface IUseLoadData {
	onFailed: (message: string) => void
}

export default function useLoadData({ onFailed }: IUseLoadData) {
	const { setState, setIsLoading } = useWalletContext()

	const load = async (urlParams: IUrlParams) => {
		setIsLoading(true)
		try {
			const response = await list(urlParams)
			setState({
				urlParams,
				users: response.data,
				totalUsers: response.headers['x-total-count'],
				currentPage: urlParams.page,
			})
		} catch (err) {
			const error = ensureError(err)
			console.error(error)
			setState({ urlParams })
			onFailed(UserApiErrors.LIST_EXCEPTION)
		} finally {
			setIsLoading(false)
		}
	}

	const getAll = async (search?: ISearchParams) => {
		try {
			const response = await listAll(search)
			return response.data
		} catch (err) {
			const error = ensureError(err)
			console.error(error)
			onFailed(UserApiErrors.LIST_EXCEPTION)
		}
	}

	return {
		load,
		getAll,
	}
}
