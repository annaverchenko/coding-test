import React from 'react'
import { useNavigate } from 'react-router-dom'

import cloneDeep from 'lodash.clonedeep'

import styled from 'styled-components/macro'

import { spacing } from '@mui/system'

import {
	Button,
	Paper as MuiPaper,
	Table,
	TableBody,
	TableContainer,
	TableCell,
	TableHead as MuiTableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Toolbar,
	Typography,
	Box,
	Fab,
} from '@mui/material'

import {
	FavoriteBorder as FavoriteBorderIcon,
	Favorite as FavoriteIcon,
} from '@mui/icons-material'

import { AppContext } from '../../../../contexts/AppContext'

import SearchByRepoName from '../SearchByRepoName/SearchByRepoName'
import FilterByLanguage from '../FilterByLanguage/FilterByLanguage'

import {
	dateToUnixTimestamp,
	unixTimestampToDateAndTime
} from '../../../../utils/formatDateAndTime'

import useBreakPoints from '../../../../hooks/useBreakpoints'

import { RepoTypeReduced } from '../../../../types/repo'

const Paper = styled( MuiPaper )( spacing )

type RowType = {
	[ key: string ]: string | number | boolean
	id: number
	name: string
	language: string
	stars: number
	forks: number
	lastUpdated: number
	isInFavouritesList: boolean
	ownerLogin: string
}

function descendingComparator ( a: RowType, b: RowType, orderBy: string ) {
	let _a: string | number | boolean
	let _b: string | number | boolean

	if (typeof a[ orderBy ] === 'string') {
		_a = (a[ orderBy ] as string).toLowerCase()
		_b = (b[ orderBy ] as string).toLowerCase()
	} else {
		_a = a[ orderBy ]
		_b = b[ orderBy ]
	}


	if (_b < _a) {
		return -1
	}
	if (_b > _a) {
		return 1
	}
	return 0
}

function getComparator ( order: 'desc' | 'asc', orderBy: string ) {
	return order === 'desc'
		? ( a: RowType, b: RowType ) => descendingComparator( a, b, orderBy )
		: ( a: RowType, b: RowType ) => -descendingComparator( a, b, orderBy )
}

function stableSort (
	array: Array<RowType>,
	comparator: ( a: RowType, b: RowType ) => number
) {
	const stabilizedThis = array.map( ( el: RowType, index: number ) => ({
		el,
		index,
	}) )
	stabilizedThis.sort( ( a, b ) => {
		const order = comparator( a.el, b.el )
		if (order !== 0) return order
		return a.index - b.index
	} )
	return stabilizedThis.map( ( element ) => element.el )
}

type HeadCell = {
	id: string
	numeric: boolean
	disablePadding: boolean
	label: string
}

const headCells: Array<HeadCell> = [
	{ id: 'name', numeric: false, disablePadding: true, label: 'Repo name', },
	{ id: 'language', numeric: true, disablePadding: false, label: 'Language' },
	{ id: 'stars', numeric: true, disablePadding: false, label: 'Stars' },
	{ id: 'forks', numeric: true, disablePadding: false, label: 'Forks' },
	{ id: 'lastUpdated', numeric: true, disablePadding: false, label: 'Last updated' },
]

type TableHeadProps = {
	order: 'desc' | 'asc'
	orderBy: string
	rowCount: number
	onRequestSort: ( e: any, property: string ) => void
}

const TableHead: React.FC<TableHeadProps> = ( props ) => {
	const { order, orderBy, onRequestSort, } = props

	const createSortHandler = ( property: string ) => ( event: any ) => {
		onRequestSort( event, property )
	}

	return (
		<MuiTableHead>
			<TableRow>
				<TableCell padding="normal" />
				{ headCells.map( ( headCell ) => (
					<TableCell
						key={ headCell.id }
						align={ headCell.numeric ? 'right' : 'left' }
						padding="normal"
						sortDirection={ orderBy === headCell.id ? order : false }
					>
						<TableSortLabel
							active={ orderBy === headCell.id }
							direction={ orderBy === headCell.id ? order : 'asc' }
							onClick={ createSortHandler( headCell.id ) }
						>
							{ headCell.label }
						</TableSortLabel>
					</TableCell>
				) ) }
				<TableCell padding="normal">
					Actions
				</TableCell>
			</TableRow>
		</MuiTableHead>
	)
}

type TableToolbarProps = {
	onSearchByNameQuery: ( query: string ) => void
	onFilterByLanguageQuery: ( query: string ) => void
	searchByNameRepoFound: boolean
}

const TableToolbar: React.FunctionComponent<TableToolbarProps> = ( props ) => {
	const { onSearchByNameQuery, onFilterByLanguageQuery, searchByNameRepoFound } = props

	const { isSmUp } = useBreakPoints()

	return (
		<Toolbar>
			<Box sx={ {
				display: 'flex',
				flexDirection: isSmUp ? 'row' : 'column',
				width: '100%',
				paddingBottom: isSmUp ? 0 : 4,
			} }>
				<Box py={ 4 } sx={ {
					display: 'flex',
					alignItems: 'center',
					order: isSmUp ? 1 : 0,
					marginLeft: isSmUp ? 'auto' : 0,
				} }>
					<SearchByRepoName
						onSearchByNameQuery={ onSearchByNameQuery }
					/>
					<FilterByLanguage
						onFilterByLanguageQuery={ onFilterByLanguageQuery }
						searchByNameRepoFound={ searchByNameRepoFound }
					/>
				</Box>
				<Box px={ 3 } sx={{
					display: 'flex',
					alignItems: 'center',
				}}>
					<Typography variant="h6" id="tableTitle">
						GitHub Repositories
					</Typography>
				</Box>
			</Box>
		</Toolbar>
	)
}

type ReposListPropsType = {
	data: Array<RepoTypeReduced>
}

const ReposList: React.FunctionComponent<ReposListPropsType> = ( props ) => {
	const { data } = props

	const [ order, setOrder ] = React.useState<'desc' | 'asc'>( 'desc' )
	const [ orderBy, setOrderBy ] = React.useState( 'stars' )
	const [ page, setPage ] = React.useState<number>( 0 )
	const [ rowsPerPage, setRowsPerPage ] = React.useState<number>( 10 )
	const [ filterByLanguageQuery, setFilterByLanguageQuery ] = React.useState<string>( '' )
	const [ searchByNameQuery, setSearchByNameQuery ] = React.useState<string>( '' )
	const [ preparedData, setPreparedData ] = React.useState<Array<RowType>>( [] )
	const [ searchByNameRepoFound, setSearchByNameRepoFound ] = React.useState<boolean>( false )

	const {
		savedFavoriteRepos, setSavedFavoriteRepos,
	} = React.useContext( AppContext )

	const navigate = useNavigate()

	React.useEffect( () => {
		const prepareData: PrepareDataType = ( data ) => {
			const getDataPrepared = ( data: Array<RepoTypeReduced> ): Array<RepoTypeReduced> => {
				const searchResult = data.find( repo => repo.name.toLowerCase() === searchByNameQuery.toLowerCase() )

				if (searchResult) {
					setSearchByNameRepoFound( true ) // this leads to looped rerender due to re-render of current component which runs tis function
					return [ searchResult ]
				} else {
					setSearchByNameRepoFound( false )
				}

				if (filterByLanguageQuery.length) {
					return data.filter( repo => {
						if (repo.language === null) {
							return false
						}

						return repo.language.toLowerCase().includes( filterByLanguageQuery.toLowerCase() )
					} )
				}

				return data
			}

			return getDataPrepared( data ).map( repo => {
				const { id, name, language, stargazers_count, forks, updated_at, owner } = repo
				const { login } = owner

				return {
					id,
					name,
					language: language === null ? '' : language,
					stars: stargazers_count,
					forks,
					lastUpdated: dateToUnixTimestamp( updated_at ),
					isInFavouritesList: checkIfRepoIsInListOfFavorites( id ),
					ownerLogin: login,
				}
			} )
		}

		setPreparedData( prepareData( data ) )
	}, [ data, filterByLanguageQuery, searchByNameQuery, savedFavoriteRepos ] )

	const checkIfRepoIsInListOfFavorites = React.useCallback( ( id: number ): boolean =>
		Boolean( savedFavoriteRepos.find( repo => repo.id === id ) ), [ savedFavoriteRepos ] )

	const handleView = ( login: string, repo: string ): void => {
		navigate( `/user/${ login }/repo/${ repo }` )
	}

	const handleFilterByLanguageQuery = React.useCallback( ( query ) => {
		setFilterByLanguageQuery( query )
	}, [] )

	const handleSearchByNameQuery = React.useCallback( ( query ) => {
		setSearchByNameQuery( query )
	}, [] )

	type PrepareDataType = ( data: Array<RepoTypeReduced> ) => Array<RowType>

	const handleRequestSort = ( event: any, property: string ) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder( isAsc ? 'desc' : 'asc' )
		setOrderBy( property )
	}

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage( newPage )
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage( parseInt( event.target.value, 10 ) )
		setPage( 0 )
	}

	const emptyRows =
		rowsPerPage - Math.min( rowsPerPage, preparedData.length - page * rowsPerPage )

	const handleFavoriteClick = ( id: number | string | boolean ): void => {
		if (typeof id !== 'number') {
			return
		}

		if (checkIfRepoIsInListOfFavorites( id )) {
			setSavedFavoriteRepos( savedFavoriteRepos.filter( repo => repo.id !== id ) )
			return
		}

		const repo = data.find( _repo => _repo.id === id )

		if (!repo) {
			return
		}

		setSavedFavoriteRepos( [ ...cloneDeep( savedFavoriteRepos ), repo ] )
	}

	return (
		<div>
			<Paper>
				<TableToolbar
					onSearchByNameQuery={ handleSearchByNameQuery }
					onFilterByLanguageQuery={ handleFilterByLanguageQuery }
					searchByNameRepoFound={ searchByNameRepoFound }
				/>
				<TableContainer>
					<Table
						aria-labelledby="tableTitle"
						size="medium"
						aria-label="enhanced table"
					>
						<TableHead
							order={ order }
							orderBy={ orderBy }
							onRequestSort={ handleRequestSort }
							rowCount={ preparedData.length }
						/>
						<TableBody>
							{ stableSort( preparedData, getComparator( order, orderBy ) )
								.slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage )
								.map( ( row, index ) => {
									const { id, name, language, stars, forks, lastUpdated, isInFavouritesList, ownerLogin } = row

									const labelId = `enhanced-table-checkbox-${ index }`

									return (
										<TableRow
											hover
											role="checkbox"
											tabIndex={ -1 }
											key={ id }
										>
											<TableCell padding="normal">
												<Fab
													aria-label="add"
													size="small"
													onClick={ () => {
														handleFavoriteClick( id )
													} }
												>
													{
														isInFavouritesList ? (
															<FavoriteIcon color="primary" />
														) : (
															<FavoriteBorderIcon color="primary" />
														)
													}
												</Fab>
											</TableCell>
											<TableCell
												component="th"
												id={ labelId }
												scope="row"
											>
												{ name }
											</TableCell>
											<TableCell align="right">{ language }</TableCell>
											<TableCell align="right">{ stars }</TableCell>
											<TableCell align="right">{ forks }</TableCell>
											<TableCell align="right">{ unixTimestampToDateAndTime( lastUpdated ) }</TableCell>
											<TableCell padding="normal">
												<Button
													variant="contained"
													color="primary"
													onClick={ () => {
														handleView( ownerLogin, name )
													} }
												>
													View
												</Button>
											</TableCell>
										</TableRow>
									)
								} ) }
							{ emptyRows > 0 && (
								<TableRow style={ { height: 53 * emptyRows } }>
									<TableCell colSpan={ 6 } />
								</TableRow>
							) }
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={ [ 5, 10, 25 ] }
					component="div"
					count={ preparedData.length }
					rowsPerPage={ rowsPerPage }
					page={ page }
					onPageChange={ handleChangePage }
					onRowsPerPageChange={ handleChangeRowsPerPage }
				/>
			</Paper>
		</div>
	)
}

export default ReposList
