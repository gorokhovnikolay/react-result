import { Route, Routes } from 'react-router-dom'
import { Home, Category, NotFounde, Item } from './pages'

export const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />}>
				<Route path=':category' element={<Category />}></Route>
				<Route path=':category/:id' element={<Item />} />
			</Route>
			<Route path='*' element={<NotFounde />} />
		</Routes>
	)
}
