import React from 'react'

import Snackbar from '../../../../components/Snackbar/Snackbar'

import ReposList from '../ReposList/ReposList'

import {
	Card as MuiCard,
	CardContent,
	CardHeader,
	Grid,
} from '@mui/material'
import styled from 'styled-components/macro'
import { spacing } from '@mui/system'

import Search from '../../../Search/components/Search/Search'

import { getAllUserRepos } from '../../api/getRepos'

import {
	SOMETHING_WENT_WRONG_ERROR_MESSAGE,
	SNACKBAR_AUTO_HIDE_DURATION,
} from '../../../../constants'

import {
	RepoType,
	ReposFetchErrorType
} from '../../../../types/repo'

const Card = styled( MuiCard )( spacing )

const Repos: React.FunctionComponent = () => {
	const [ query, setQuery ] = React.useState<string>( '' )
	const [ repos, setRepos ] = React.useState<Array<RepoType> | null>( null )
	const [ error, setError ] = React.useState<ReposFetchErrorType | null>( null )
	const [ loading, setLoading ] = React.useState<boolean>( false )

	React.useEffect( () => {
		let isMounted = true

		const fetchRepos = async (): Promise<void> => {
			if (!query || query.length < 3) {
				setRepos( null )
				return
			}

			try {
				setLoading( true )

				const response = await getAllUserRepos( query )

				if (!isMounted) {
					return
				}

				if (response.status === 404) {
					setRepos( null )
					setError( {
						isActive: true,
						message: 'The user is not found'
					} )
				}

				if (response.status !== 200) {
					setRepos( null )
					setError( {
						isActive: true,
						message: SOMETHING_WENT_WRONG_ERROR_MESSAGE
					} )
				}

				setRepos( response.data )
				setError( null )
			} catch (error: any) {
				if (!isMounted) {
					return
				}

				setRepos( null )
				setError( {
					isActive: true,
					message: error.message
				} )
			} finally {
				setLoading( false )
			}
		}

		fetchRepos()

		return () => {
			isMounted = false
		}
	}, [ query ] )

	const handleQueryChange = React.useCallback( ( query: string ) => {
		setQuery( query )
	}, [] )

	const handleSnackbarClose = React.useCallback( ( event?: React.SyntheticEvent | Event, reason?: string ) => {
		if (reason === 'clickaway') {
			return
		}

		setError( null )
	}, [] )

	return (
		<React.Fragment>
			<Grid container spacing={ 6 }>
				<Grid item xs={ 12 }>
					<Card mb={ 6 }>
						<CardHeader title="Search GitHub Users" />
						<CardContent>
							<Search
								loading={ loading }
								onQueryChange={ handleQueryChange }
							/>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={ 12 }>
					{
						repos === null ? null
							: !repos.length ? (
								<Card mb={ 6 }>
									<CardHeader title="The user has no repositories yet" />
								</Card>
							) : (
								<ReposList data={ repos } />
							)
					}
				</Grid>
			</Grid>

			<Snackbar
				isOpen={ Boolean( error?.isActive ) }
				onClose={ handleSnackbarClose }
				message={ error?.message }
				autoHideDuration={ SNACKBAR_AUTO_HIDE_DURATION }
			/>
		</React.Fragment>
	)
}

export default Repos
