import React, { FunctionComponent } from 'react'

import useCustomTheme from '../../hooks/useCustomTheme'

import {
	Box,
	Grid,
	Alert,
} from '@mui/material'

import {
	Wrapper,
	Heading,
	DemoButton,
	DemoButtonInner,
	DemoTitle,
} from './ThemeDemos.styles'

import { THEMES } from '../../theme/constants'

type DemoTypes = {
	title: string
	themeName: string
}

const SingleDemo: FunctionComponent<DemoTypes> = ( props ) => {
	const { title, themeName } = props

	const {
		theme,
		setTheme
	} = useCustomTheme()

	return (
		<Grid item xs={ 6 }>
			<DemoButton
				active={ themeName === theme }
				onClick={ () => setTheme( themeName ) }
			>
				<DemoButtonInner selectedTheme={ themeName } />
			</DemoButton>
			<DemoTitle variant="subtitle2" gutterBottom>
				{ title }
			</DemoTitle>
		</Grid>
	)
}

const ThemeDemos: FunctionComponent = () => (
	<Wrapper>
		<Heading>Select preferred theme</Heading>

		<Box px={ 4 } my={ 3 }>
			<Alert icon={ false } severity="info">
				Below you may choose the style that fits your desire best.
			</Alert>
		</Box>

		<Box px={ 4 } my={ 4 }>
			<Grid container spacing={ 3 }>
				<SingleDemo title="Default" themeName={ THEMES.DEFAULT } />
				<SingleDemo title="Light" themeName={ THEMES.LIGHT } />
				<SingleDemo title="Dark" themeName={ THEMES.DARK } />
			</Grid>
		</Box>
	</Wrapper>
)

export default ThemeDemos
