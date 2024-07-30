import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/context-provider'

export const Home = () => {
	const { pathname } = useLocation()
	const {user,signup} = useAuth()
	const navigation = useNavigate()

	return (
		<div className='container'>
			<header>
				<Link to='/'>
					<h1>Rick & Morty</h1>

				</Link>
				{user !== ''? <button onClick={()=>signup(()=>{
					navigation('/')
				})}>{user}</button> :<Link to='/login'>Вход</Link>}
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
