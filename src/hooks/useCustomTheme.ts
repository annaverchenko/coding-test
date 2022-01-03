import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

const useCustomTheme = () => useContext( ThemeContext )

export default useCustomTheme
