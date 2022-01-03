import React from 'react'

import { Outlet } from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'

import GlobalStyle from '../../styles/styled-components/GlobalStyle'

import {
	LayoutRoot,
	LayoutContent,
	MainLayoutContent
} from './MainLayout.styles'

import AppBar from '../../components/AppBar/AppBar'
import AppSettings from '../../components/AppSettings/AppSettings'

import useBreakpoints from '../../hooks/useBreakpoints'

const MainLayout: React.FunctionComponent = ( props ) => {

	const { isLgUp } = useBreakpoints()

	return (
		<LayoutRoot>
			<CssBaseline />
			<GlobalStyle />
			<LayoutContent>
				<AppBar />
				<MainLayoutContent
					pt={ isLgUp ? 12 : 5 }
					pb={ 28 }
					px={ isLgUp ? 12 : 5 }
				>
					{ props.children }
					<Outlet />
				</MainLayoutContent>
			</LayoutContent>
			<AppSettings />
		</LayoutRoot>
	)
}

export default MainLayout
