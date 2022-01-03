import styled, { css } from 'styled-components/macro'

import {
  ListItemButton,
  Typography,
} from '@mui/material'

import { grey } from '@mui/material/colors'

import { THEMES } from '../../theme/constants'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 258px;
  height: 100%;
  overflow-x: hidden;
`

export const Heading = styled(ListItemButton)`
  flex-grow: 0 !important;
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;

  ${(props) => props.theme.breakpoints.up('sm')} {
    min-height: 64px;
  }
`

export type DemoButtonType = {
  active?: boolean
}

export const DemoButton = styled.div<DemoButtonType>`
  background: ${(props) => props.theme.palette.background.paper};
  height: 80px;
  border-radius: 0.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.825rem;
  position: relative;
  border: 1px solid
    ${(props) =>
  !props.active
    ? props.theme.palette.action.selected
    : props.theme.palette.action.active};
`

export type DemoButtonInnerType = {
  selectedTheme: string
}

export const DemoButtonInner = styled.div<DemoButtonInnerType>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px ${(props) => props.theme.palette.action.selected};
  position: relative;

  ${(props) =>
  props.selectedTheme === THEMES.DEFAULT &&
  css`
      background: linear-gradient(-45deg, #23303f 50%, ${grey[100]} 0);
    `}
  ${(props) =>
  props.selectedTheme === THEMES.DARK &&
  css`
      background: #23303f;
    `}
  ${(props) =>
  props.selectedTheme === THEMES.LIGHT &&
  css`
      background: ${grey[100]};
    `}
`

export const DemoTitle = styled(Typography)`
  text-align: center;
`
