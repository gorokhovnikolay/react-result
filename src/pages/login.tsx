import { useLocation, useNavigate } from "react-router-dom"
import { Signin } from "../components/Signin"
import { useAuth } from "../context/context-provider"
import { IValues } from "../App"

export const Login =()=>{
	const {signin} = useAuth()
	const location = useLocation()
	const navigation = useNavigate()
	const path = location.state?.from as string || '/'
	console.log(location)
	const onSubmit=(values:IValues)=>{
		signin(values.email,()=>{
			navigation(`${path}`,{replace:true})
		})
	}
	return <div className='container'><Signin onSubmit={onSubmit}/></div>
}
