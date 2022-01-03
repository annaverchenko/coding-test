import * as React from 'react'

import Loader from '../Loader/Loader'

const sleep = ( m: number ) => new Promise( ( r ) => setTimeout( r, m ) )

type componentType = React.ComponentClass<any> | null;

interface IAsyncState {
	component: componentType;
}

const asyncComponent = ( importComponent: any ): React.ComponentClass => {
	class AsyncComponent extends React.Component<any, IAsyncState> {
		constructor ( props: any ) {
			super( props )

			this.state = {
				component: null,
			}
		}

		async componentDidMount () {
			await sleep( process.env.NODE_ENV === 'development' ? 150 : 0 )

			const { default: component } = await importComponent()

			this.setState( {
				component,
			} )
		}

		render () {
			const Component: componentType = this.state.component

			return Component ? <Component { ...this.props } /> : <Loader />
		}
	}

	return AsyncComponent
}

export default asyncComponent
