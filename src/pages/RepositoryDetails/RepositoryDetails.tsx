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

import RepoDetailsContainer from '../../features/Repos/components/RepoDetailsContainer/RepoDetailsContainer'

const Divider = styled( MuiDivider )( spacing )

const Breadcrumbs = styled( MuiBreadcrumbs )( spacing )

const RepositoryDetails: React.FunctionComponent = () => {
	return (
		<React.Fragment>
			<Helmet title="Repository Details" />
			<Typography variant="h3" gutterBottom display="inline">
        Repository
			</Typography>

			<Breadcrumbs aria-label="Breadcrumb" mt={ 2 }>
				<Link component={ NavLink } to="/">
					Home
				</Link>
				<Typography>Repository</Typography>
			</Breadcrumbs>

			<Divider my={ 6 } />

			<RepoDetailsContainer />
		</React.Fragment>
	)
}

export default RepositoryDetails
