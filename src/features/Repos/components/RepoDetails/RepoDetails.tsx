import React from 'react'

import styled from 'styled-components/macro'

import {
	Collapse,
	List,
	ListItemIcon,
	Card as MuiCard,
	CardHeader as MuiCardHeader,
	CardContent as MuiCardContent,
	ListItemButton as MuiListItemButton,
	ListItemText as MuiListItemText,
	IconButton, IconButtonProps,
	Typography,
	Divider as MuiDivider,
	Box,
	Avatar,
	Link,
} from '@mui/material'

import {
	ExpandMore as ExpandMoreIcon,
	CompareArrows as CompareArrowsIcon,
	GitHub as GitHubIcon,
	Description as DescriptionIcon,
	Today as TodayIcon,
	Event as EventIcon,
	Public as PublicIcon,
	Star as StarIcon,
	Translate as TranslateIcon,
	BugReport as BugReportIcon,
	Image as ImageIcon,
} from '@mui/icons-material'

import { spacing, flexbox, compose } from '@mui/system'

import { stringDateToReadableDateAndTime } from '../../../../utils/formatDateAndTime'

import {
	ContributorType,
	IssueType,
	PullRequestType,
	UserSingleRepoType
} from '../../../../types/repo'

const Card = styled( MuiCard )( spacing )

const CardHeader = styled( MuiCardHeader )( spacing )

const CardContent = styled( MuiCardContent )( spacing )

const ListItemText = styled( MuiListItemText )( spacing )

const ListItemButton = styled( MuiListItemButton )( compose( spacing, flexbox ) )

const Divider = styled( MuiDivider )( spacing )

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean
}

const ExpandMore = styled( ( props: ExpandMoreProps ) => {
	const { expand, ...other } = props
	return <IconButton { ...other } />
} )( ( { theme, expand } ) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create( 'transform', {
		duration: theme.transitions.duration.shortest,
	} ),
}) )

type RepoDetailsType = {
	repoDetails: UserSingleRepoType | null
	pullRequests: Array<PullRequestType>
	issues: Array<IssueType>
	contributors: Array<ContributorType>
}

const RepoDetails: React.FunctionComponent<RepoDetailsType> = ( props ) => {
	const { repoDetails, pullRequests, issues, contributors } = props

	type ExpandedType = {
		[ key: string ]: boolean
		repositoryDetails: boolean
		pullRequests: boolean
		issues: boolean
		contributors: boolean
	}

	const expandedInitialState = {
		repositoryDetails: false,
		pullRequests: false,
		issues: false,
		contributors: false,
	}

	const [ expanded, setExpanded ] = React.useState<ExpandedType>( expandedInitialState )

	const handleExpandClick = ( value: string ) => {
		const updatedExpanded = {
			...expanded,
			[ value ]: !expanded[ value ]
		}
		setExpanded( updatedExpanded )
	}

	const renderRepositoryDetails = ( title: string, value: string | number | null | undefined ) => (
		<React.Fragment>
			<Typography variant="subtitle1" component="span">{ title }: </Typography>
			{ typeof value === 'string' && value.includes( 'http://' ) ? (
				<Link href={ value } target="_blank">{ value }</Link>
			) : (
				<Typography variant="body1" component="span">{ value || '' }</Typography>
			)}

		</React.Fragment>
	)

	const renderPullRequest = ( item: PullRequestType ) => (
		<React.Fragment>
			<Box mb={ 4 }>
				<Typography variant="subtitle1">Pull request:</Typography>
				<Typography variant="body1">{ item.title }</Typography>
			</Box>
			<Box mb={ 4 }>
				<Typography variant="subtitle1">Body:</Typography>
				<Typography variant="body1" sx={{ wordBreak: "break-word" }}>{ item.body }</Typography>
			</Box>
			<Box mb={ 4 }>
				<Typography variant="subtitle1">Created at:</Typography>
				<Typography variant="body1">{ stringDateToReadableDateAndTime( item?.created_at || '' ) }</Typography>
			</Box>
			<Box mb={ 4 }>
				<Typography variant="subtitle1">Last updated at:</Typography>
				<Typography variant="body1">{ stringDateToReadableDateAndTime( item?.updated_at || '' ) }</Typography>
			</Box>
			<Box mb={ 4 }>
				<Typography variant="subtitle1">Closed at:</Typography>
				<Typography variant="body1">{ stringDateToReadableDateAndTime( item?.closed_at || '' ) }</Typography>
			</Box>
			<Divider mt={ 12 } mb={ 8 } />
		</React.Fragment>
	)

	const renderIssue = ( item: IssueType ) => (
		<React.Fragment>
			<Box mb={ 4 }>
				<Typography variant="subtitle1">Issue:</Typography>
				<Typography variant="body1">{ item.title }</Typography>
			</Box>
			<Box mb={ 4 }>
				<Typography variant="subtitle1">Body:</Typography>
				<Typography variant="body1" sx={{ wordBreak: "break-word" }}>{ item.body }</Typography>
			</Box>
			<Box mb={ 4 }>
				<Typography variant="subtitle1">State:</Typography>
				<Typography variant="body1">{ item.state }</Typography>
			</Box>
			<Box mb={ 4 }>
				<Typography variant="subtitle1">Created at:</Typography>
				<Typography variant="body1">{ stringDateToReadableDateAndTime( item?.created_at || '' ) }</Typography>
			</Box>
			<Box mb={ 4 }>
				<Typography variant="subtitle1">Last updated at:</Typography>
				<Typography variant="body1">{ stringDateToReadableDateAndTime( item?.updated_at || '' ) }</Typography>
			</Box>
			<Box mb={ 4 }>
				<Typography variant="subtitle1">Closed at:</Typography>
				<Typography variant="body1">{ stringDateToReadableDateAndTime( item?.closed_at || '' ) }</Typography>
			</Box>
			<Divider mt={ 12 } mb={ 8 } />
		</React.Fragment>
	)

	const renderContributors = ( item: ContributorType ) => (
		<React.Fragment>
			<Box mb={ 4 }>
				<Typography variant="subtitle1">Contributor:</Typography>
				<Typography variant="body1">{ item.login }</Typography>
			</Box>
			<Box mb={ 4 }>
				<Typography variant="subtitle1">Contributions:</Typography>
				<Typography variant="body1">{ item.contributions }</Typography>
			</Box>
			<Box mb={ 4 }>
				<Typography variant="subtitle1">Type:</Typography>
				<Typography variant="body1">{ item.type }</Typography>
			</Box>
			<Divider mt={ 12 } mb={ 8 } />
		</React.Fragment>
	)

	const repositoryDetailsData = [
		{ title: 'Repository', value: repoDetails?.name, icon: GitHubIcon, },
		{ title: 'Description', value: repoDetails?.description, icon: DescriptionIcon, },
		{
			title: 'Created at',
			value: stringDateToReadableDateAndTime( repoDetails?.created_at || '' ),
			icon: TodayIcon,
		},
		{
			title: 'Last updated at',
			value: stringDateToReadableDateAndTime( repoDetails?.updated_at || '' ),
			icon: EventIcon,
		},
		{ title: 'Home page', value: repoDetails?.homepage, icon: PublicIcon, },
		{ title: 'Stars', value: repoDetails?.stargazers_count, icon: StarIcon, },
		{ title: 'Language', value: repoDetails?.language, icon: TranslateIcon, },
		{ title: 'Open issues', value: repoDetails?.open_issues, icon: BugReportIcon, },
	]

	return (
		<React.Fragment>
			<Card mb={ 6 }>
				<CardHeader
					title="Repository details"
					action={
						<ExpandMore
							expand={ expanded.repositoryDetails }
							onClick={ () => {
								handleExpandClick( 'repositoryDetails' )
							} }
							aria-expanded={ expanded.repositoryDetails }
							aria-label="show more"
						>
							<ExpandMoreIcon />
						</ExpandMore>
					}
				/>
				<Collapse in={ expanded.repositoryDetails } timeout="auto" unmountOnExit>
					<CardContent pb={ 0 }>
						<List component="nav">
							{ repositoryDetailsData.map( item => {
								const { title, value, icon: Icon } = item

								return (
									<ListItemButton
										key={ `data-item-${ title }` }
									>
										<ListItemIcon>
											<Icon />
										</ListItemIcon>
										<ListItemText
											inset
											disableTypography
											primary={ renderRepositoryDetails( title, value ) }
											pl={ 0 }
										/>
									</ListItemButton>
								)
							})}
						</List>
					</CardContent>
				</Collapse>
			</Card>
			<Card mb={ 6 }>
				<CardHeader
					title="Pull requests"
					action={
						<ExpandMore
							expand={ expanded.pullRequests }
							onClick={ () => {
								handleExpandClick( 'pullRequests' )
							} }
							aria-expanded={ expanded.pullRequests }
							aria-label="show more"
						>
							<ExpandMoreIcon />
						</ExpandMore>
					}
				/>
				<Collapse in={ expanded.pullRequests } timeout="auto" unmountOnExit>
					<CardContent pb={ 0 }>
						{ !pullRequests.length ? (
							<Typography variant="body1">
								This repository has no pull requests
							</Typography>
						) : (
							<List component="nav">
								{ pullRequests.map( pr => (
									<ListItemButton
										key={ `data-item-${ pr.title }` }
										alignItems="flex-start"
									>
										<ListItemIcon>
											<CompareArrowsIcon fontSize="large" />
										</ListItemIcon>
										<ListItemText
											inset
											disableTypography
											primary={ renderPullRequest( pr ) }
											pl={ 0 }
										/>
									</ListItemButton>
								))}
							</List>
						) }
					</CardContent>
				</Collapse>
			</Card>
			<Card mb={ 6 }>
				<CardHeader
					title="Issues"
					action={
						<ExpandMore
							expand={ expanded.issues }
							onClick={ () => {
								handleExpandClick( 'issues' )
							} }
							aria-expanded={ expanded.issues }
							aria-label="show more"
						>
							<ExpandMoreIcon />
						</ExpandMore>
					}
				/>
				<Collapse in={ expanded.issues } timeout="auto" unmountOnExit>
					<CardContent pb={ 0 }>
						{ !issues.length ? (
								<Typography variant="body1">
									This repository has no issues
								</Typography>
							) : (
							<List component="nav">
								{ issues.map( issue => (
									<ListItemButton
										key={ `data-item-${ issue.title }` }
										alignItems="flex-start"
									>
										<ListItemIcon>
											<BugReportIcon fontSize="large" />
										</ListItemIcon>
										<ListItemText
											inset
											disableTypography
											primary={ renderIssue( issue ) }
											pl={ 0 }
										/>
									</ListItemButton>
								))}
							</List>
							) }
					</CardContent>
				</Collapse>
			</Card>
			<Card mb={ 6 }>
				<CardHeader
					title="Contributors"
					action={
						<ExpandMore
							expand={ expanded.contributors }
							onClick={ () => {
								handleExpandClick( 'contributors' )
							} }
							aria-expanded={ expanded.contributors }
							aria-label="show more"
						>
							<ExpandMoreIcon />
						</ExpandMore>
					}
				/>
				<Collapse in={ expanded.contributors } timeout="auto" unmountOnExit>
					<CardContent pb={ 0 }>
						{ !issues.length ? (
							<Typography variant="body1">
								This repository has no contributors
							</Typography>
						) : (
							<List component="nav">
								{ contributors.map( contributor => (
									<ListItemButton
										key={ `data-item-${ contributor.login }` }
										alignItems="flex-start"
									>
										<ListItemIcon>
											{ !contributor.avatar_url ? (
												<ImageIcon />
											) : (
												<Avatar alt={ contributor.login } src={ contributor.avatar_url } />
											) }

										</ListItemIcon>
										<ListItemText
											inset
											disableTypography
											primary={ renderContributors( contributor ) }
											pl={ 0 }
										/>
									</ListItemButton>
								))}
							</List>
						) }
					</CardContent>
				</Collapse>
			</Card>
		</React.Fragment>
	)
}

export default RepoDetails
