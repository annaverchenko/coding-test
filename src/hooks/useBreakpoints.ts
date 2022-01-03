import { useTheme, useMediaQuery } from '@mui/material'

type UseBreakpointsType = () => {
	isSmUp: boolean
	isMdUp: boolean
	isLgUp: boolean
}

const useBreakpoints: UseBreakpointsType = () => {
	const theme = useTheme()
	const isSmUp = useMediaQuery( theme.breakpoints.up( 'sm' ) )
	const isMdUp = useMediaQuery( theme.breakpoints.up( 'md' ) )
	const isLgUp = useMediaQuery( theme.breakpoints.up( 'lg' ) )

	return {
		isSmUp,
		isMdUp,
		isLgUp
	}
}

export default useBreakpoints
