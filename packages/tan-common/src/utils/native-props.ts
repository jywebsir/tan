import React from 'react'
import classNames from 'classnames'

export type NativeProps<S extends string = never> = {
  className?: string;
  style?: React.CSSProperties & Partial<Record<S, string>>;
} & Record<string, any> 

export function withNativeProps<P extends NativeProps>(
  props: P,
  element: React.ReactElement
) {
  const p = {
    ...element.props,
  }

  if (props.className) {
    p.className = classNames(element.props.className, props.className)
  }

  if (props.style) {
    p.style = {
      ...p.style,
      ...props.style,
    }
  }

	for (const key in props) {
    if (!props.hasOwnProperty(key)) continue
    if (key.startsWith('data-')) {
      p[key] = props[key]
    }
  }

  return React.cloneElement(element, p)
}