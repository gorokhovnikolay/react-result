import {createContext, ReactNode, useContext, useState} from 'react'

interface AuxProps {
	children: ReactNode;
  }


const AuthContext = createContext({})

export const useAuth = ()=>useContext(AuthContext)

export const AuthProvider = ({children}:AuxProps)=>{
	const [user, setUser] = useState('')

	const signin=(newUser:string,callback:()=>void)=>{
		setUser(newUser)
		callback()
	}
	const signup=(callback:()=>void)=>{
		setUser('')
		callback()
	}

	const value = {
		user,
		signin,
		signup,
	}

	return<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
