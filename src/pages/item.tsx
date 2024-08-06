import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface IItem {
	[key: string]: string | number
}

export const Item = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [item, setItem] = useState<IItem>({})
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(true)

	console.log(location)

	useEffect(() => {
		setError('')
		setIsLoading(true)
		fetch(`${location.state.url}`)
			.then((res) => res.json())
			.then((data) => {
				setItem(data)
			})
			.catch(() => setError('Запрашиваемой страницы не существует'))
			.finally(() => setIsLoading(false))
	}, [location.state.url])

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
				<h1>{item.name}</h1>
				{item.image && (
					<img src={item.image as string} alt={item.name as string} />
				)}
				{item.status && <p>Статус: {item.status}</p>}
				{item.species && <p>Расса: {item.species}</p>}
				{item.type && <p>Тип: {item.type}</p>}
				{item.gender && <p>Пол: {item.gender}</p>}
				{item.air_date && <p>Дата выхода: {item.air_date}</p>}
				{item.episode && <p>Эпизод: {item.episode}</p>}
				{item.dimension && <p>Популяция: {item.dimension}</p>}
			</div>
		</div>
	)
}
