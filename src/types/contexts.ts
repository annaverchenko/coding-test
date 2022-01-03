import { RepoTypeReduced, UserSingleRepoType } from './repo'

export type AppContextType = {
	savedFavoriteRepos: Array<RepoTypeReduced>
	setSavedFavoriteRepos: ( value: Array<RepoTypeReduced> ) => void
	fetchedFavoriteRepos: Array<UserSingleRepoType>
	setFetchedFavoriteRepos: ( value: Array<UserSingleRepoType> ) => void
}

export type ThemeContextType = {
	theme: string
	setTheme: ( value: string ) => void
}
