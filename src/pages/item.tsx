import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface IItem {
	[key: string]: string | number
}

export const Item = () => {
	const { category, id } = useParams()
	const navigate = useNavigate()
	const [item, setItem] = useState<IItem[]>([])
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		setError('')
		setIsLoading(true)
		fetch(`/${category}?id=${id}`)
			.then((res) => res.json())
			.then((data) => {
				data.length > 0
					? setItem(data)
					: setError('Запрашиваемой страницы не существует')
			})
			.catch(() => setError('Запрашиваемой страницы не существует'))
			.finally(() => setIsLoading(false))
	}, [category, id])

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
		<div className='card'>
			<button onClick={() => navigate(-1)}>Назад</button>
			<div>
				<h1>{item[0].name}</h1>
				{item[0].image && (
					<img src={item[0].image as string} alt={item[0].name as string} />
				)}
				{item[0].status && <p>Статус: {item[0].status}</p>}
				{item[0].species && <p>Расса: {item[0].species}</p>}
				{item[0].type && <p>Тип: {item[0].type}</p>}
				{item[0].gender && <p>Пол: {item[0].gender}</p>}
				{item[0].air_date && <p>Дата выхода: {item[0].air_date}</p>}
				{item[0].episode && <p>Эпизод: {item[0].episode}</p>}
				{item[0].dimension && <p>Популяция: {item[0].dimension}</p>}
			</div>
		</div>
	)
}
