import React from 'react'

import { useRoutes } from 'react-router-dom'

import { HelmetProvider, Helmet } from 'react-helmet-async'

import {
	ThemeProvider as MuiThemeProvider,
	StyledEngineProvider,
} from '@mui/material/styles'

import { ThemeProvider as ThemeProviderStyled } from 'styled-components/macro'

import AppContextProvider from './contexts/AppContext'

import createTheme from './theme'
import useCustomTheme from './hooks/useCustomTheme'

import appRoutes from './routes'

const App: React.FunctionComponent = () => {
	const { theme } = useCustomTheme()

	const appContent = useRoutes( appRoutes )

	return (
		<HelmetProvider>
			<Helmet
				titleTemplate="%s | Coding Test"
				defaultTitle="Coding Test"
			/>
			<StyledEngineProvider injectFirst>
				<MuiThemeProvider theme={ createTheme( theme ) }>
					<ThemeProviderStyled theme={ createTheme( theme ) }>
						<AppContextProvider>
							{ appContent }
						</AppContextProvider>
					</ThemeProviderStyled>
				</MuiThemeProvider>
			</StyledEngineProvider>
		</HelmetProvider>
	)
}

export default App
