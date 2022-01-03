import React from 'react'

import { RepoTypeReduced, UserSingleRepoType } from '../types/repo'

import { AppContextType } from '../types/contexts'

const AppContext = React.createContext<AppContextType>( {
	savedFavoriteRepos: [],
	setSavedFavoriteRepos: ( value ) => {
	},
	fetchedFavoriteRepos: [],
	setFetchedFavoriteRepos: ( value ) => {
	},
} )

type AppContextProviderPropsType = {
	children?: React.ReactNode
}

const AppContextProvider: React.FunctionComponent<AppContextProviderPropsType> = ( props ) => {
	const initialSavedFavoriteReposState = () => {
		const storedTheme = localStorage.getItem( 'favoriteRepos' )

		return storedTheme ? JSON.parse( storedTheme ) : []
	}

	const [ savedFavoriteRepos, _setSavedFavoriteRepos ] = React.useState<Array<RepoTypeReduced>>( initialSavedFavoriteReposState )
	const [ fetchedFavoriteRepos, setFetchedFavoriteRepos ] = React.useState<Array<UserSingleRepoType>>( initialSavedFavoriteReposState )

	const setSavedFavoriteRepos = ( value: Array<RepoTypeReduced> ) => {
		localStorage.setItem( 'favoriteRepos', JSON.stringify( value ) )
		_setSavedFavoriteRepos( value )
	}

	const providerValues = {
		savedFavoriteRepos, setSavedFavoriteRepos,
		fetchedFavoriteRepos, setFetchedFavoriteRepos,
	}

	return (
		<AppContext.Provider value={ providerValues }>
			{ props.children }
		</AppContext.Provider>
	)
}

export { AppContextProvider as default, AppContext }
