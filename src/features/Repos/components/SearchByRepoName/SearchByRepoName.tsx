import React from 'react'

import {
	Box,
	Tooltip,
	IconButton,
	Slide,
	TextField,
} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

import { useStyles } from './SearchByRepoName.styles'

type FilterByLanguageProps = {
	onSearchByNameQuery: ( query: string ) => void
}

const SearchByRepoName: React.FunctionComponent<FilterByLanguageProps> = ( props ) => {
	const [ searchOpen, setSearchOpen ] = React.useState<boolean>( false )
	const [ query, setQuery ] = React.useState<string>( '' )

	const searchInputRef = React.useRef<HTMLInputElement>( null )
	const containerRef = React.useRef( null )

	const inputSlideAnimationDuration = 600

	React.useEffect( () => {
		const timer = setTimeout( () => {
			if (searchOpen && searchInputRef.current) {
				searchInputRef.current.focus()
			}
		}, inputSlideAnimationDuration )

		return () => {
			clearTimeout( timer )
		}
	}, [ searchOpen ] )

	React.useEffect( () => {
		props.onSearchByNameQuery( query )
	}, [ query ] )

	const handleSearchOpen = (): void => {
		setSearchOpen( searchOpen => !searchOpen )
	}

	const handleQueryChange = ( event: React.ChangeEvent<HTMLInputElement> ): void => {
		setQuery( event.target.value )
	}

	const classes = useStyles()

	return (
		<React.Fragment>
			<Box
				sx={ {
					width: 200,
					height: 'auto',
					marginRight: 4,
					borderRadius: 5,
					overflow: 'hidden',
				} }
				ref={ containerRef }
			>
				<Box sx={ { width: 200 } }>
					<Slide
						direction="left"
						in={ searchOpen }
						timeout={ inputSlideAnimationDuration }
						container={ containerRef.current }
					>
						<TextField
							inputRef={ searchInputRef }
							value={ query }
							onChange={ handleQueryChange }
							InputProps={ { className: classes.searchInput } }
						/>
					</Slide>
				</Box>
			</Box>
			<Tooltip
				title="Search by repository name"
				placement="top"
			>
				<IconButton
					aria-label="Search"
					size="large"
					onClick={ handleSearchOpen }
				>
					<SearchIcon />
				</IconButton>
			</Tooltip>
		</React.Fragment>
	)
}

export default SearchByRepoName
