import { useRef } from 'react'
import { useMemoizedFn, useUpdate } from 'ahooks'

export default function usePropsValue(options) {
  const { value, defaultValue, onChange } = options

  const update = useUpdate()

  const stateRef = useRef(value !== undefined ? value : defaultValue)
  if (value !== undefined) {
    stateRef.current = value
  }

  const setState = useMemoizedFn((v, forceTrigger = false) => {
    const nextValue =
      typeof v === 'function' ? v(stateRef.current) : v

		if (!forceTrigger && nextValue === stateRef.current) return

    stateRef.current = nextValue

		update()

		return onChange?.(nextValue)
  })

  return [stateRef.current, setState]
}