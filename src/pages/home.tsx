import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

export const Home = () => {
	const { pathname } = useLocation()

	return (
		<div className='container'>
			<header>
				<Link to='/'>
					<h1>Rick & Morty</h1>
				</Link>
				<nav>
					<div className='main_menu'>
						<NavLink to='/characters'>Герои</NavLink>
						<NavLink to='/location'>Локации</NavLink>
						<NavLink to='/episode'>Эпизоды</NavLink>
					</div>
				</nav>
			</header>
			{pathname === '/' && (
				<div>Добро пожаловать в справочник по вселенной Рика и Морти</div>
			)}
			<Outlet />
		</div>
	)
}
