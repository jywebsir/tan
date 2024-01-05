import React from 'react'
import DemoBlock from '../../components/demo-block'
import DemoPage from '../../components/demo-page'
import { useImmer } from 'use-immer'
import Cell from '@/components/cell'
import Calendar from '@/components/calendar'

const DEFAULT_CONFIG = {
  show: false,
  closeable: true,
  type: 'single'
}

const CalendarPage = () => {
  const [config, updateConfig] = useImmer({
    ...DEFAULT_CONFIG
  })

  const onClickCell = (event) => {
    const { type } = event.currentTarget.dataset

    updateConfig(draft => {
      return {
        ...DEFAULT_CONFIG,
        show: true,
        type
      }
    })
  }

  return (
    <DemoPage>
      <DemoBlock title="基础用法" padding>
        <Cell
          title="选择单个日期"
          data-type="single"
          onClick={onClickCell}
        />
      </DemoBlock>

      <Calendar
        {...config}
      />
    </DemoPage>
  )
}

export default CalendarPage
