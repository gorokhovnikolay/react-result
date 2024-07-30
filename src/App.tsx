import './App.css'
import { AuthProvider } from './context/context-provider';
import { Router } from './router'


export interface IValues {
	confirmPassword?: string;
	email: string;
	gender?: string;
	name?: string;
	nikname?: string;
	password: string;
  }

function App() {
	return <AuthProvider><Router /></AuthProvider>
}

export default App
