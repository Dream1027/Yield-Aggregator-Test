import { ReactNode, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Icon } from '~/components/Icon'

import { useIsClient } from '~/hooks'

export const CSVDownloadButton = ({
	onClick,
	customText = '',
	className,
	smol
}: {
	onClick: () => void
	isLight?: boolean
	customText?: ReactNode
	className?: string
	smol?: boolean
}) => {



	return (
		<>
			<button
				className={`flex items-center gap-1 justify-center py-2 px-2 whitespace-nowrap text-xs rounded-md text-[var(--link-text)] bg-[var(--link-bg)] hover:bg-[var(--link-hover-bg)] focus-visible:bg-[var(--link-hover-bg)] disabled:opacity-50 disabled:cursor-not-allowed ${
					className ?? ''
				}`}
				
			>
				{customText ? (
					<span>{customText}</span>
				) : (
					<>
						<Icon name="download-paper" className="h-3 w-3" />
						<span>{smol ? '' : 'Download'} .csv</span>
					</>
				)}
			</button>
			
		</>
	)
}
