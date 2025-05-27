import * as React from 'react'
import Head from 'next/head'
import { useIsClient } from '~/hooks'



interface ILayoutProps {
	title: string
	children: React.ReactNode
	defaultSEO?: boolean
	backgroundColor?: string
	className?: string
	style?: React.CSSProperties
}

export default function Layout({
	title,
	children,
	defaultSEO = false,
	backgroundColor,
	className,
	...props
}: ILayoutProps) {
	const isClient = useIsClient()
	return (
		<>
			<Head>
				<title>{title}</title>
				<link rel="icon" type="image/png" href="/favicon-32x32.png" />
			</Head>
			
			<main
				{...props}
				className={`flex flex-col gap-1 text-[var(--text1)] isolate p-1 lg:p-4 lg:pl-[0px] min-h-screen lg:w-[calc(100vw-1rem)] ${
					className ?? ''
				}`}
				style={{
					backgroundColor:'rgb(134, 59, 219)'
				}}
			>
				{children}
			</main>
			
		</>
	)
}

// sidebar + gap between nav & main + padding right
// 228px + 4px + 16px = 248px
