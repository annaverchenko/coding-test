import axios from 'axios'

import {
	RepoTypeReduced,
	UserSingleRepoType,
} from '../../../types/repo'

type GetAllUserReposType = ( query: string ) => Promise<any>

export const getAllUserRepos: GetAllUserReposType = ( query ) =>
	axios.get( `https://api.github.com/users/${ query }/repos` )

type FetchFavoriteRepoType = ( repo: RepoTypeReduced ) => Promise<UserSingleRepoType>

const fetchFavoriteRepos: FetchFavoriteRepoType = ( repo ) => {
	const url = `https://api.github.com/repos/${ repo.owner.login }/${ repo.name }`

	return axios
		.get( url )
		.then( ( response ) => {
			return ({
				...response.data,
				success: true,
			})
		} )
		.catch( error => ({
			success: false
		}) )
}

type GetFavoriteReposType = ( repos: Array<RepoTypeReduced> ) => Promise<Array<UserSingleRepoType>>

export const getFavoriteRepos: GetFavoriteReposType = ( repos ) =>
	Promise.all( repos.map( fetchFavoriteRepos ) )

type GetRepoDetailsType = ( login: string, repo: string ) => Promise<any>

export const getRepoDetails: GetRepoDetailsType = ( login, repo ) =>
	axios.get( `https://api.github.com/repos/${ login }/${ repo }` )

type GetPullRequestsType = ( login: string, repo: string ) => Promise<any>

export const getPullRequests: GetPullRequestsType = ( login, repo ) =>
	axios.get( `https://api.github.com/repos/${ login }/${ repo }/pulls` )

type GetIssuesType = ( login: string, repo: string ) => Promise<any>

export const getIssues: GetIssuesType = ( login, repo ) =>
	axios.get( `https://api.github.com/repos/${ login }/${ repo }/issues` )

type GetContributorsType = ( login: string, repo: string ) => Promise<any>

export const getContributors: GetContributorsType = ( login, repo ) =>
	axios.get( `https://api.github.com/repos/${ login }/${ repo }/contributors` )
