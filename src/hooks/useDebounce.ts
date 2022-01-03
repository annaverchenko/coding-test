import React from 'react'

const useDebounce = ( initialValue: string, timeout: number = 800 ) => {
	const [ value, setValue ] = React.useState<string>( initialValue )

	React.useEffect( () => {
		const handler = setTimeout( () => setValue( initialValue ), timeout )

		return () => clearTimeout( handler )
	}, [ initialValue, timeout ] )

	return value
}

export default useDebounce
