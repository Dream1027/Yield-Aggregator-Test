import * as React from 'react'
import RouterLink from 'next/link'

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLSpanElement> {
	children: React.ReactNode
}

export const BasicLink = React.memo(
	React.forwardRef<HTMLSpanElement, BasicLinkProps>(function BasicLink(props, ref) {
		
		return (
      <span ref={ref} {...props}>
        {props.children}
      </span>
    )
	})
)
