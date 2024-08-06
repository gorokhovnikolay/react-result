import { Suspense } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/context-provider'
import ErrorBoundary from '../components/ErrorBoundary'

export const Home = () => {
	const { pathname } = useLocation()
	const { user, signup } = useAuth()
	const navigation = useNavigate()

	return (
		<div className='container'>
			<header>
				<Link to='/'>
					<h1>Rick & Morty</h1>
				</Link>
				{user !== '' ? (
					<button
						onClick={() =>
							signup(() => {
								navigation('/')
							})
						}
					>
						{user}
					</button>
				) : (
					<Link to='/login'>Вход</Link>
				)}
				<nav>
					<div className='main_menu'>
						<NavLink to='/character'>Герои</NavLink>
						<NavLink to='/location'>Локации</NavLink>
						<NavLink to='/episode'>Эпизоды</NavLink>
						<NavLink to='/test'>test</NavLink>
					</div>
				</nav>
			</header>
			{pathname === '/' && (
				<div>Добро пожаловать в справочник по вселенной Рика и Морти</div>
			)}
			<ErrorBoundary>
				<Suspense fallback='Загрузка'>
					<Outlet />
				</Suspense>
			</ErrorBoundary>
		</div>
	)
}
