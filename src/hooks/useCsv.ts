import { useRef, useState } from 'react'
import { Parser } from '@json2csv/plainjs'

import User from '../classes/user'
import { CsvErrors } from '../utils/utils'
import { IUser } from '../types/user'

interface UseCsvConfig {
	getFileName: () => string
	onError: (message: string) => void
}

export default function useCsvApi({ onError, getFileName }: UseCsvConfig) {
	const ref = useRef<HTMLAnchorElement | null>(null)

	const csvParse = (data: IUser[]) => {
		try {
			const parser = new Parser()
			const dto = data.map((obj) => new User(obj).csvView())
			const csv = parser.parse(dto)
			return csv
		} catch (err) {
			console.error(err)
		}
	}

	const csvDownload = (data: IUser[]) => {
		try {
			const csv = csvParse(data) || ''
			const url = URL.createObjectURL(
				new Blob([csv], { type: 'txt/csv' })
			)
			ref.current?.setAttribute('href', url)
			ref.current?.setAttribute('download', getFileName())
			ref.current?.click()
			URL.revokeObjectURL(url)
		} catch (error) {
			onError(CsvErrors.EXPORT_CSV_EXCEPTION)
		}
	}

	return {
		csvDownload,
		ref,
	}
}
