import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'

function useSerchBooks(page: number, category: string) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [books, setBooks] = useState<object>({})
	const [hasMore, setHasMore] = useState(false)

	useEffect(() => {
		setBooks({})
	}, [category])

	useEffect(() => {
		setLoading(true)
		setError(false)
		axios({
			method: 'GET',
			url: `https://rickandmortyapi.com/api/${category}`,
			params: { page },
		}).then((res) => {
			setBooks((prev) => {
				return {
					...prev,
					...res.data.results.reduce((acc: object, item: any) => {
						return { ...acc, [item.id]: item }
					}, {}),
				}
			})
			setLoading(false)
			setHasMore(!!res.data.info.next)
		})
	}, [page, category])

	return { loading, error, books, hasMore }
}

export const Test = () => {
	const [category, setCategory] = useState('character')
	const [page, setPage] = useState(1)

	const { loading, error, books, hasMore } = useSerchBooks(page, category)

	const observer = useRef<any>()
	const lastRef = useCallback(
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
		[hasMore, loading, setPage],
	)

	const changeCategory = (cat: string) => {
		setPage(1)
		setCategory(cat)
	}

	return (
		<div className='App'>
			<button onClick={() => changeCategory('character')}>character</button>
			<button onClick={() => changeCategory('episode')}>episode</button>
			<button onClick={() => changeCategory('location')}>location</button>

			{Object.values(books).map((item, index) => {
				if (index + 1 === Object.values(books).length) {
					return (
						<div ref={lastRef} key={item.id}>
							{item.name}
						</div>
					)
				}
				return <div key={item.id}>{item.name}</div>
			})}
			{loading && <div>Loading</div>}
			{error && <div>error</div>}
		</div>
	)
}
