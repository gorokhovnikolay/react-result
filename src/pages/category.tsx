import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

interface String {
	[key: string]: string | number
}

export const Category = () => {
	const [data, setData] = useState<String[] | []>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState('')
	const { category } = useParams()
	const [URLSearchParams, SetURLSearchParams] = useSearchParams()
	const params = URLSearchParams.get('_sort')

	useEffect(() => {
		setError('')
		setIsLoading(true)
		fetch(`/${category}?_sort=${params}`)
			.then((data) => data.json())
			.then((data) => {
				setData(data)
			})
			.catch((e) => {
				setError('Запрашиваемой страницы не существует')
			})
			.finally(() => setIsLoading(false))
	}, [category, params])

	if (isLoading) {
		return <p>Loading...</p>
	}
	if (error) {
		return (
			<div>
				<p>{error}</p>
				<Link to='/'>На главную</Link>
			</div>
		)
	}

	return (
		<div className='content'>
			<div className='category_menu'>
				<button onClick={() => SetURLSearchParams({ _sort: 'created' })}>
					Сначала новые
				</button>
				<button onClick={() => SetURLSearchParams({ _sort: '-created' })}>
					Сначала старые
				</button>
				<div className='category_list'>
					{data.map((item) => {
						return (
							<Link key={item.id} to={`${item.id}`}>
								<h3>{item.name}</h3>
							</Link>
						)
					})}
				</div>
			</div>
		</div>
	)
}
