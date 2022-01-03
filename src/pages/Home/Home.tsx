import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import {
	Link,
	Breadcrumbs as MuiBreadcrumbs,
	Divider as MuiDivider,
	Typography,
} from '@mui/material'
import { spacing } from '@mui/system'

import Repos from '../../features/Repos/components/Repos/Repos'

const Divider = styled( MuiDivider )( spacing )

const Breadcrumbs = styled( MuiBreadcrumbs )( spacing )

const Home: React.FunctionComponent = () => {
	return (
		<React.Fragment>
			<Helmet title="Coding Test" />
			<Typography variant="h3" gutterBottom display="inline">
				Home
			</Typography>

			<Breadcrumbs aria-label="Breadcrumb" mt={ 2 }>
				<Link component={ NavLink } to="/">
					Home
				</Link>
				<Typography>Home</Typography>
			</Breadcrumbs>

			<Divider my={ 6 } />

			<Repos />
		</React.Fragment>
	)
}

export default Home
