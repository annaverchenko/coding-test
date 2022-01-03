import moment from 'moment'

import { DATE_AND_TIME_FORMAT } from './constants'

type GetFormattedDateType = ( value: string | Date )  => string

const getFormattedDate: GetFormattedDateType =
	( value ) => moment( value ).format( DATE_AND_TIME_FORMAT )

export default getFormattedDate
