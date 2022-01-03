import { makeStyles, createStyles } from '@mui/styles'
import { Theme } from '@mui/material'

export const useStyles = makeStyles( ( theme: Theme ) =>
	createStyles( {
		searchInput: {
			height: '3em',
			borderRadius: theme.spacing( 5 ),
		}
	} ),
)
