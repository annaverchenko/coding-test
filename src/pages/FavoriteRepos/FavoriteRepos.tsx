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

import Favorites from '../../features/Repos/components/Favorites/Favorites'

const Divider = styled( MuiDivider )( spacing )

const Breadcrumbs = styled( MuiBreadcrumbs )( spacing )

const FavoriteRepos: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <Helmet title="Favorite Repositories" />
      <Typography variant="h3" gutterBottom display="inline">
        Favorite repositories
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={ 2 }>
        <Link component={ NavLink } to="/">
          Home
        </Link>
        <Typography>Repository</Typography>
      </Breadcrumbs>

      <Divider my={ 6 } />

      <Favorites />
    </React.Fragment>
  )
}

export default FavoriteRepos
