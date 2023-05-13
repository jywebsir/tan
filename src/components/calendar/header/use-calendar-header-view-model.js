import { useState } from 'react'
import { useMount } from 'ahooks'

const defaultWeeks = ['日', '一', '二', '三', '四', '五', '六']

const useCalendarHeaderViewModel = (firstDayOfWeek = 0) => {
	const [weekdays, setWeekdays] = useState([])

	useMount(() => {
		setWeekdays([
			...defaultWeeks.slice(firstDayOfWeek, 7),
			...defaultWeeks.slice(0, firstDayOfWeek)
		])
	})

	return weekdays
}

export default useCalendarHeaderViewModel 