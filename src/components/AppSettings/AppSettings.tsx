import React from 'react'

import { Drawer } from '@mui/material'
import{ Palette as PaletteIcon } from '@mui/icons-material'

import ThemeDemos from '../ThemeDemos/ThemeDemos'

import { Fab } from './AppSettings.styles'

const AppSettings: React.FunctionComponent = () => {
	const [ state, setState ] = React.useState({
		isOpen: false,
	})

	type ToggleDrawerType = ( open: boolean ) => () => void

	const toggleDrawer: ToggleDrawerType = ( open ) => () => {
		setState({ ...state, isOpen: open })
	}

	return (
		<React.Fragment>
			<Fab color="primary" aria-label="Edit" onClick={ toggleDrawer(true) }>
				<PaletteIcon />
			</Fab>
			<Drawer anchor="right" open={ state.isOpen } onClose={ toggleDrawer(false) }>
				<ThemeDemos />
			</Drawer>
		</React.Fragment>
	)
}

export default AppSettings
