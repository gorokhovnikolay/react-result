import { Component, ErrorInfo, ReactNode } from 'react'

interface ItemProps {
	children: ReactNode
	hasError?: boolean
}

class ErrorBoundary extends Component<ItemProps, { hasError: boolean }> {
	constructor(props: any) {
		super(props)
		this.state = {
			hasError: false,
		}
	}

	static getDerivedStateFromError(error: any) {
		console.error(error)
		return {
			hasError: true,
		}
	}
	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error(error)
		console.error(errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return <h2>Что то пошло не так</h2>
		}
		return this.props.children
	}
}

export default ErrorBoundary
