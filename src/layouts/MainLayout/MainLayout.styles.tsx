import { spacing } from '@mui/system'

import { Paper as MuiPaper } from '@mui/material'

import styled from 'styled-components/macro'

export const LayoutRoot = styled.div`
  display: flex;
  min-height: 100vh;
`
export const LayoutContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`
const Paper = styled( MuiPaper )( spacing )

export const MainLayoutContent = styled( Paper )`
  flex: 1;
  background: ${ ( props ) => props.theme.palette.background.default };

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`
