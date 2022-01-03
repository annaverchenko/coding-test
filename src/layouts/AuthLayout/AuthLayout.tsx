import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components/macro'

import { CssBaseline } from '@mui/material'

import AppSettings from '../../components/AppSettings/AppSettings'
import GlobalStyle from '../../styles/styled-components/GlobalStyle'

const LayoutRoot = styled.div`
  max-width: 520px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`

const AuthLayout: React.FunctionComponent = ( props ) => {
	return (
		<LayoutRoot>
			<CssBaseline />
			<GlobalStyle />
			{ props.children }
			<Outlet />
			<AppSettings />
		</LayoutRoot>
	)
}

export default AuthLayout
