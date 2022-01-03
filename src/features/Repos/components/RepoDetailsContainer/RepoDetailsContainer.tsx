import React from 'react'
import { useParams } from 'react-router-dom'

import cloneDeep from 'lodash.clonedeep'

import {
	Backdrop,
	CircularProgress,
} from '@mui/material'

import RepoDetails from '../RepoDetails/RepoDetails'

import {
	getRepoDetails,
	getPullRequests,
	getIssues,
	getContributors,
} from '../../api/getRepos'

import {
	ContributorType,
	IssueType,
	PullRequestType,
	ReposFetchErrorType,
	UserSingleRepoType
} from '../../../../types/repo'

const RepoDetailsContainer: React.FunctionComponent = () => {
	const [ repoDetails, setRepoDetails ] = React.useState<UserSingleRepoType | null>( null )
	const [ pullRequests, setPullRequests ] = React.useState<Array<PullRequestType>>( [] )
	const [ issues, setIssues ] = React.useState<Array<IssueType>>( [] )
	const [ contributors, setContributors ] = React.useState<Array<ContributorType>>( [] )
	const [ loading, setLoading ] = React.useState<boolean>( true )
	const [ errors, setErrors ] = React.useState<Array<ReposFetchErrorType>>( [] )

	const { login, name } = useParams()

	React.useEffect( () => {
		let isMounted = true;

		const fetchAllData = async () => {
			try {
				const responseValues = await Promise.all([
					await getRepoDetails( login!, name! ),
					await getPullRequests( login!, name! ),
					await getIssues( login!, name! ),
					await getContributors( login!, name! ),
				])

				const [
					repoDetails,
					pullRequests,
					issues,
					contributors,
				] = responseValues

				if (!isMounted) {
					return
				}

				if (repoDetails.status === 404) {
					setRepoDetails( null )
					setErrors( [
						...cloneDeep( errors ),
						{
							isActive: true,
							message: 'The user was not found'
						}
					])
				}

				if (pullRequests.status === 404) {
					setPullRequests( [] )
					setErrors( [
						...cloneDeep( errors ),
						{
							isActive: true,
							message: 'The pull requests were not found'
						}
					])
				}

				if (issues.status === 404) {
					setIssues( [] )
					setErrors( [
						...cloneDeep( errors ),
						{
							isActive: true,
							message: 'The issues were not found'
						}
					])
				}

				if (contributors.status === 404) {
					setContributors( [] )
					setErrors( [
						...cloneDeep( errors ),
						{
							isActive: true,
							message: 'The contributors were not found'
						}
					])
				}

				if (repoDetails.status !== 200) {
					setRepoDetails( null )
					setErrors( [
						...cloneDeep( errors ),
						{
							isActive: true,
							message: 'Something went wrong while fetching repository details data. Please refresh the page and try again.'
						}
					])
				}

				if (pullRequests.status !== 200) {
					setPullRequests( [] )
					setErrors( [
						...cloneDeep( errors ),
						{
							isActive: true,
							message: 'Something went wrong while fetching pull requests data. Please refresh the page and try again.'
						}
					])
				}

				if (issues.status !== 200) {
					setIssues( [] )
					setErrors( [
						...cloneDeep( errors ),
						{
							isActive: true,
							message: 'Something went wrong while fetching issues data. Please refresh the page and try again.'
						}
					])
				}

				if (contributors.status !== 200) {
					setContributors( [] )
					setErrors( [
						...cloneDeep( errors ),
						{
							isActive: true,
							message: 'Something went wrong while contributors data. Please refresh the page and try again.'
						}
					])
				}

				setErrors( [] )
				setRepoDetails( repoDetails.data )
				setPullRequests( pullRequests.data )
				setIssues( issues.data )
				setContributors( contributors.data )
			} catch (error: any) {
				if (!isMounted) {
					return
				}

				setRepoDetails( null )
				setErrors( [
					...cloneDeep( errors ),
					{
						isActive: true,
						message: error.message
					}
				])
			} finally {
				setLoading( false )
			}
		}

		fetchAllData()

		return () => {
			isMounted = false
		}
	}, [] )

	return (
		<React.Fragment>
			{ loading ? (
				<Backdrop
					sx={ { color: '#fff', zIndex: ( theme ) => theme.zIndex.drawer + 1 } }
					open={ true }
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			) : null }

			<RepoDetails
				repoDetails={ repoDetails }
				pullRequests={ pullRequests }
				issues={ issues }
				contributors={ contributors }
			/>
		</React.Fragment>
	)
}

export default RepoDetailsContainer
