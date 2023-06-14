import { Parser } from '@json2csv/plainjs'
import { IUser } from '../types/user'

export default function useCsvApi() {
	const csvParse = (data: IUser[]) => {
		try {
			const parser = new Parser()
			const csv = parser.parse(data)
			return csv
		} catch (err) {
			console.error(err)
		}
	}

	return {
		csvParse,
	}
}
