import * as React from 'react'
import styled, { withTheme } from 'styled-components/macro'

import { Link } from 'react-router-dom'

import {
	AppBar as MuiAppBar,
	Toolbar,
	Box,
	IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material'

import {
  Menu as MenuIcon
} from '@mui/icons-material'

const AppBar = styled( MuiAppBar )`
  background: ${ ( props ) => props.theme.header.background };
  color: ${ ( props ) => props.theme.header.color };
`

type PageType = {
	name: string
	url: string
}

const pages: Array<PageType> = [
	{ name: 'Home', url: '/', },
	{ name: 'Favorites', url: '/favorites', },
]

type AppBarProps = {
	theme: {}
}

const AppBarComponent: React.FC<AppBarProps> = ( props ) => {
	const [ anchorElNav, setAnchorElNav ] = React.useState<null | HTMLElement>( null )

	const handleOpenNavMenu = ( event: React.MouseEvent<HTMLElement> ) => {
		setAnchorElNav( event.currentTarget )
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav( null )
	}

	return (
		<React.Fragment>
			<AppBar position="sticky" elevation={ 0 }>
				<Toolbar>
					<Box sx={ { flexGrow: 1, display: { xs: 'flex', md: 'none' } } }>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={ handleOpenNavMenu }
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={ anchorElNav }
							anchorOrigin={ {
								vertical: 'bottom',
								horizontal: 'left',
							} }
							keepMounted
							transformOrigin={ {
								vertical: 'top',
								horizontal: 'left',
							} }
							open={ Boolean( anchorElNav ) }
							onClose={ handleCloseNavMenu }
							sx={ {
								display: { xs: 'block', md: 'none' },
							} }
						>
							{ pages.map( ( { name, url } ) => (
								<MenuItem key={ `menu-link-${ name }` } onClick={ handleCloseNavMenu }>
									<Button component={ Link } to={ url }>
										{ name }
									</Button>
								</MenuItem>
							) ) }
						</Menu>
					</Box>
					<Box sx={ { flexGrow: 1, display: { xs: 'none', md: 'flex' } } }>
						{ pages.map( ( { name, url } ) => (
							<Button
                key={ `menu-link-${ name }` }
								sx={ { my: 2, color: 'white', display: 'block' } }
								component={ Link } to={ url }
							>
								{ name }
							</Button>
						) ) }
					</Box>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	)
}

export default withTheme( AppBarComponent )
