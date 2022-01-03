import * as React from 'react'
import {
	Snackbar as MuiSnackbar,
	Alert as MuiAlert,
	AlertProps,
} from '@mui/material'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>( (
	props,
	ref,
) => (
	<MuiAlert elevation={ 6 } ref={ ref } variant="filled" { ...props } />
) )

type SnackbarPropsType = {
	isOpen: boolean
	message?: string
	onClose: () => void
	autoHideDuration?: number
}

const Snackbar: React.FunctionComponent<SnackbarPropsType> = ( props ) => {
	const {
		isOpen,
		message,
		onClose,
		autoHideDuration = 5000
	} = props

	return (
		<React.Fragment>
			<MuiSnackbar
				anchorOrigin={ { vertical: 'bottom', horizontal: 'left', } }
				open={ isOpen }
				autoHideDuration={ autoHideDuration }
				onClose={ onClose }
				message={ message }
			>
				<Alert onClose={ onClose } severity="error" sx={ { width: '100%' } }>
					{ message }
				</Alert>
			</MuiSnackbar>
		</React.Fragment>
	)
}

export default Snackbar
