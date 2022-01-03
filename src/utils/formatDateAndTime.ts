import moment from 'moment'

import { DATE_AND_TIME_FORMAT } from '../constants'

type DateToUnixTimestampType = ( value: string ) => number

export const dateToUnixTimestamp: DateToUnixTimestampType = ( value ) =>
	moment( value ).valueOf()

type UnixTimestampToDateAndTimeType = ( value: number ) => string

export const unixTimestampToDateAndTime: UnixTimestampToDateAndTimeType = ( value ) =>
	moment( value ).format( DATE_AND_TIME_FORMAT )

type StringDateToReadableDateAndTimeType = ( value: string ) => string

export const stringDateToReadableDateAndTime: StringDateToReadableDateAndTimeType = ( value ) =>
	moment( moment( value ).valueOf() ).format( DATE_AND_TIME_FORMAT )
