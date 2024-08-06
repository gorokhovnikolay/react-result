import { lazy, Suspense } from 'react'

const componentName = (name: string) => {
	return lazy(() =>
		import(`../pages/${name}`).then((module) => {
			return { default: module[name] }
		}),
	)
}

export const Component = (props: any) => {
	const Component = componentName(props.name)
	return (
		<Suspense fallback='Загрузка...'>
			<Component {...props} />
		</Suspense>
	)
}
