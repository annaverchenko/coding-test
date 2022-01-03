import { makeStyles, createStyles } from '@mui/styles'
import { Theme } from '@mui/material'

export const useStyles = makeStyles( ( theme: Theme ) =>
	createStyles( {
		helpText: {
			color: theme.palette.text.secondary,
		},
		userLink: {
			cursor: 'pointer',
			'&:hover': {
				color: theme.palette.info.light,
			}
		},
	} ),
)
