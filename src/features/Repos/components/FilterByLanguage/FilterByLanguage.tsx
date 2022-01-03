import React from 'react'

import {
	IconButton,
	TextField,
	Tooltip,
	Popover,
} from '@mui/material'
import { FilterList as FilterListIcon } from '@mui/icons-material'

type FilterByLanguageProps = {
	onFilterByLanguageQuery: ( query: string ) => void
	searchByNameRepoFound: boolean
}

const FilterByLanguage: React.FunctionComponent<FilterByLanguageProps> = ( props ) => {
	const { onFilterByLanguageQuery, searchByNameRepoFound } = props

	const [ query, setQuery ] = React.useState<string>( '' )
	const [ anchorEl, setAnchorEl ] = React.useState<HTMLButtonElement | null>( null )

	const filterInputRef = React.useRef<HTMLInputElement>( null )

	const inputSlideAnimationDuration = 600

	React.useEffect( () => {
		const timer = setTimeout( () => {
			if (anchorEl && filterInputRef.current) {
				filterInputRef.current.focus()
			}
		}, inputSlideAnimationDuration )

		return () => {
			clearTimeout( timer )
		}
	}, [ anchorEl ] )

	React.useEffect( () => {
		onFilterByLanguageQuery( query )
	}, [ query ] )

	const handleClick = ( event: React.MouseEvent<HTMLButtonElement> ) => {
		setAnchorEl( event.currentTarget )
	}

	const handleClose = () => {
		setAnchorEl( null )
	}

	const open = Boolean( anchorEl )
	const id = open ? 'filterByLanguage' : undefined

	const handleQueryChange = ( event: React.ChangeEvent<HTMLInputElement> ): void => {
		setQuery( event.target.value )
	}

	return (
		<React.Fragment>
			<Popover
				id={ id }
				open={ open }
				anchorEl={ anchorEl }
				onClose={ handleClose }
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<TextField
					inputRef={ filterInputRef }
					value={ query }
					onChange={ handleQueryChange }
				/>
			</Popover>
			<Tooltip
				title="Filter by language"
				placement="top"
			>
				<IconButton
					aria-label="Filter by language"
					aria-describedby={id}
					size="large"
					onClick={ handleClick }
					disabled={ searchByNameRepoFound }
				>
					<FilterListIcon />
				</IconButton>
			</Tooltip>
		</React.Fragment>
	)
}

export default FilterByLanguage
