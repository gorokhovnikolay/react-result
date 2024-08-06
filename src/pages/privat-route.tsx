import { ReactElement } from 'react'
import { useAuth } from '../context/context-provider'
import { Navigate, useLocation } from 'react-router-dom'

export const PrivatRoute = ({ children }: { children: ReactElement }) => {
	const user = useAuth()
	const location = useLocation()

	if (user.user === '') {
		return <Navigate to='/login' state={{ from: location.pathname }} replace />
	}
	return children
}
