import { Route, Routes } from 'react-router-dom'
import { Home, Category, NotFounde, Item,Login,Register } from './pages'
import { PrivatRoute } from './pages/privat-route'

export const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />}>
				<Route path=':category' element={<PrivatRoute><Category /></PrivatRoute>}/>
				<Route path=':category/:id' element={<PrivatRoute><Item /></PrivatRoute>} />
			</Route>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='*' element={<NotFounde />} />
		</Routes>
	)
}
