import React from 'react'

import {
	Box,
	Paper,
	TextField,
	Typography,
	InputAdornment,
	CircularProgress,
} from '@mui/material'

import clsx from 'clsx'

import useDebounce from '../../../../hooks/useDebounce'

import { useStyles } from './Search.styles'

import { githubTop10 } from '../../../../constants'

type SearchPropsType = {
	loading: boolean
	onQueryChange: ( query: string ) => void
}

const Search: React.FunctionComponent<SearchPropsType> = ( props ) => {
	const {
		loading,
		onQueryChange
	} = props

	const [ value, setValue ] = React.useState( '' )

	const debounceDelay = 800
	const debouncedValue = useDebounce( value, debounceDelay )

	React.useEffect( () => {
		onQueryChange( debouncedValue )
	}, [ debouncedValue ] )

	const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
		setValue( event.target.value )
	}

	const classes = useStyles()

	return (
		<Paper
			sx={ { p: '2px 4px', display: 'flex', alignItems: 'center' } }
		>
			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
			}}>
				<TextField
					id="search-github-user"
					label="GitHub user"
					type="search"
					value={ value }
					onChange={ handleChange }
					fullWidth
					helperText="* Minimum 3 characters required."
					InputProps={ {
						endAdornment: loading ? (
							<InputAdornment position="end">
								<CircularProgress
									size={ 20 }
									color="inherit"
								/>
							</InputAdornment>
						) : null,
					} }
				/>
				<Box px={ 4 }>
					<Typography variant="body2">
						<small className={ classes.helpText }>
							You may enter any existing github user name or pick any of the names provided below:
						</small>
					</Typography>
					<Typography variant="body2">
						{ githubTop10.map( ( user, index, users ) => (
							<React.Fragment key={ `github-user-${ user }` }>
								<small
									onClick={ () => setValue( user ) }
									className={ clsx( classes.helpText, classes.userLink ) }
								>
									{ user }
								</small>
								<small className={ classes.helpText }>{ `${ index < users.length - 1 ? ', ' : '' }` }</small>
							</React.Fragment>
						) )}
					</Typography>
				</Box>
			</Box>
		</Paper>
	)
}

export default Search
