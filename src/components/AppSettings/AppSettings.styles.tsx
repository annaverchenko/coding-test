import styled from 'styled-components/macro'

import {
	Fab as MuiFab,
} from '@mui/material'

export const Fab = styled(MuiFab)`
  position: fixed !important;
  right: ${(props) => props.theme.spacing(8)};
  bottom: ${(props) => props.theme.spacing(8)};
  z-index: 100;
`
