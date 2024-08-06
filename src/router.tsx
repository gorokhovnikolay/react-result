import { Route, Routes } from 'react-router-dom'
import { NotFounde, Item, Login, Register, Home } from './pages'
import { PrivatRoute } from './pages/privat-route'
import { Component } from './components/Component'
import { Test } from './components/Test'

export const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />}>
				<Route
					path=':category'
					element={
						<PrivatRoute>
							<Component name='Cat' />
						</PrivatRoute>
					}
				/>
				<Route
					path=':category/:id'
					element={
						<PrivatRoute>
							<Item />
						</PrivatRoute>
					}
				/>
			</Route>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/test' element={<Test />} />
			<Route path='*' element={<NotFounde />} />
		</Routes>
	)
}
