import React from 'react'

import { AppContext } from '../../../../contexts/AppContext'

import ReposList from '../ReposList/ReposList'

import {
	Card as MuiCard,
	CardHeader,
	Grid,
	Backdrop,
  CircularProgress,
} from '@mui/material'
import styled from 'styled-components/macro'
import { spacing } from '@mui/system'

import { getFavoriteRepos } from '../../api/getRepos'

const Card = styled( MuiCard )( spacing )

const Favorites: React.FunctionComponent = () => {
	const [ loadingFavoriteRepos, setLoadingFavoriteRepos ] = React.useState<boolean>( true )

	const {
		savedFavoriteRepos,
		fetchedFavoriteRepos, setFetchedFavoriteRepos,
	} = React.useContext( AppContext )

	React.useEffect( () => {
		let isMounted = true

		const fetchFavoriteRepos = async (): Promise<void> => {
			try {
				const result = await getFavoriteRepos( savedFavoriteRepos )

				if (isMounted) {
					setFetchedFavoriteRepos( result )
				}
			}
			catch (error) {
				console.log(error)
			}
			finally {
				setLoadingFavoriteRepos( false )
			}
		}

		fetchFavoriteRepos()

		return () => {
			isMounted = false
		}
	}, [ savedFavoriteRepos ] )

	return (
		<React.Fragment>
			<Grid container spacing={ 6 }>
				<Grid item xs={ 12 }>
					{
						loadingFavoriteRepos ? (
							<Backdrop
								sx={ { color: '#fff', zIndex: ( theme ) => theme.zIndex.drawer + 1 } }
								open={ true }
							>
								<CircularProgress color="inherit" />
							</Backdrop>
						) : !fetchedFavoriteRepos.length ? (
							<Card mb={ 6 }>
								<CardHeader title="Your favorites list is empty" />
							</Card>
						) : (
							<ReposList data={ fetchedFavoriteRepos } />
						)
					}
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default Favorites
