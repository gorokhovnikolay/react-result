import { useCallback, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSerchBooks } from '../hooks/useFetchItem'

export const Cat = () => {
	const { category } = useParams()

	const { books, loading, error, hasMore, setPage } = useSerchBooks(category)

	const observer = useRef<IntersectionObserver>()
	const lastNodeRef = useCallback(
		(node: any) => {
			if (loading) return
			if (observer.current) {
				observer.current.disconnect()
			}
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPage((prev) => prev + 1)
				}
			})
			if (node) {
				observer.current.observe(node)
			}
		},

		[loading, hasMore, setPage],
	)

	return (
		<div className='content'>
			<div className='category_menu'>
				<div className='category_list'>
					{Object.values(books).map((item, index) => {
						if (Object.values(books).length === index + 1) {
							return (
								<Link
									ref={lastNodeRef}
									key={item.id}
									to={`${item.id}`}
									state={{ url: item.url }}
								>
									<h3>{item.name}</h3>
								</Link>
							)
						}
						return (
							<Link
								key={item.id}
								to={`${item.id}`}
								state={{ url: item.url }}
							>
								<h3>{item.name}</h3>
							</Link>
						)
					})}
				</div>
				{loading && <div>Загрузка</div>}
				{error && <div>Ошибка</div>}
			</div>
		</div>
	)
}
