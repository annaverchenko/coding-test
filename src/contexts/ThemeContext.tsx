import React from 'react'

import { THEMES } from '../theme/constants'

import { ThemeContextType } from '../types/contexts'

const initialState = {
	theme: THEMES.DEFAULT,
	setTheme: ( theme: string ) => {
	},
}

const ThemeContext = React.createContext<ThemeContextType>( initialState )

type ThemeProviderProps = {
	children: React.ReactNode;
};

const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = ( props ) => {
	const initialState = () => {
		const storedTheme = localStorage.getItem( 'theme' )

		return storedTheme ? JSON.parse( storedTheme ) : THEMES.DEFAULT
	}

	const [ theme, _setTheme ] = React.useState<string>( initialState() )

	const setTheme = ( theme: string ) => {
		localStorage.setItem( 'theme', JSON.stringify( theme ) )
		_setTheme( theme )
	}

	return (
		<ThemeContext.Provider value={ { theme, setTheme } }>
			{ props.children }
		</ThemeContext.Provider>
	)
}

export { ThemeProvider as default, ThemeContext }
